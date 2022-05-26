import { rest, setupWorker } from "msw";
import z, { ZodError } from "zod";
import { ShoppingListItem } from "../shoppingListService";
import { v4 as uuid } from "uuid";

const KEY = "shoppingList";

const newItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  unit: z.string().min(1, "Unit is required"),
  qnt: z.number().positive("Quantity must be a positive number"),
  done: z.boolean(),
});

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
  rest.get("/api/shoppingList/units", (_, res, ctx) => res(ctx.delay(500), ctx.json(["kg", "pcs", "g"]))),
  rest.get("/api/shoppingList", (req, res, ctx) => {
    const params = new URLSearchParams(req.url.search);
    const page = Number(params.get("page") ?? 1);
    const perPage = Number(params.get("perPage") ?? 10);
    const search = params.get("search");
    const filteredList = search
      ? shoppingList.filter(({ name }) => name.toLocaleLowerCase().includes(search?.toLocaleLowerCase() ?? ""))
      : shoppingList;
    const maxPage = Math.ceil(filteredList.length / perPage);

    return res(
      ctx.delay(1000),
      ctx.json({ shoppingList: filteredList.slice((page - 1) * perPage, page * perPage), maxPage })
    );
  }),
  rest.post<Omit<ShoppingListItem, "id">>("/api/shoppingList", (req, res, ctx) => {
    try {
      const parsedData = newItemSchema.parse(req.body);
      const newItem = { id: uuid(), ...parsedData };
      shoppingList.unshift(newItem);
      persistData(shoppingList);
      return res(ctx.json(newItem), ctx.status(201));
    } catch (error) {
      if (error instanceof ZodError) {
        return res(ctx.json({ message: error.errors[0].message }), ctx.status(400));
      }
      return res(ctx.status(500));
    }
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
