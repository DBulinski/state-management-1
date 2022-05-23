import { rest, setupWorker } from "msw";
import { ShoppingListItem } from "../shoppingListService";
import { v4 as uuid } from "uuid";

const KEY = "shoppingList";

const getFromLocalStorage = (): ShoppingListItem[] => {
  const storageItem = localStorage.getItem(KEY);
  if (storageItem) {
    return JSON.parse(storageItem);
  }
  return [];
};
const persistData = (data: ShoppingListItem[]) => localStorage.setItem(KEY, JSON.stringify(data));

let shoppingList = getFromLocalStorage();

export const worker = setupWorker(
  rest.get("/api/shoppingList", (req, res, ctx) => {
    const params = new URLSearchParams(req.url.search);
    const page = Number(params.get("page") ?? 0);
    const perPage = Number(params.get("perPage") ?? 10);
    const search = params.get("search");
    const filteredList = search
      ? shoppingList.filter(({ name }) => name.toLocaleLowerCase().includes(search?.toLocaleLowerCase() ?? ""))
      : shoppingList;
    const maxPage = Math.ceil(filteredList.length / perPage);
    return res(ctx.json({ shoppingList: filteredList.slice((page - 1) * perPage, page * perPage), maxPage }));
  }),
  rest.post<Omit<ShoppingListItem, "id">>("/api/shoppingList", (req, res, ctx) => {
    const newItem = { id: uuid(), ...req.body };
    shoppingList.unshift(newItem);
    persistData(shoppingList);
    return res(ctx.json(newItem), ctx.status(201));
  }),
  rest.delete("/api/shoppingList/:id", (req, res, ctx) => {
    shoppingList = shoppingList.filter(({ id }) => id !== req.params.id);
    persistData(shoppingList);
    return res(ctx.status(204));
  }),
  rest.put<{ done: boolean }>("/api/shoppingList/:id", (req, res, ctx) => {
    shoppingList = shoppingList.map((item) => (item.id === req.params.id ? { ...item, done: req.body.done } : item));
    persistData(shoppingList);
    return res(ctx.status(201));
  })
);
