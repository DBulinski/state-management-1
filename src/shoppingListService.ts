import { RouteObject } from "@remix-run/router";
import { DataFunctionArgs } from "@remix-run/router/utils";
import { redirect } from "react-router-dom";
import z from "zod";

class ShoppingListHttpError extends Error {}

const shoppingListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  qnt: z.number(),
  unit: z.string(),
  done: z.boolean(),
});

const filterParamsSchema = z.object({
  page: z.number(),
  perPage: z.number(),
  search: z.string(),
});

export const shoppingListResponseSchema = z.object({
  shoppingList: z.array(shoppingListItemSchema),
  maxPage: z.number(),
});

export type ShoppingListItem = z.infer<typeof shoppingListItemSchema>;
export type FilterParams = z.infer<typeof filterParamsSchema>;
export type ShoppingListResponse = z.infer<typeof shoppingListResponseSchema>;

const API_URL = "/api/shoppingList";

export const shoppingListService = {
  get: ({ request }: { request: Request }): Promise<ShoppingListResponse> => {
    const urlParams = new URL(request.url).searchParams;

    return fetch(`${API_URL}?${urlParams}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
      })
      .then((response) => shoppingListResponseSchema.parse(response));
  },
  add: async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const item = {
      name: formData.get("name"),
      qnt: Number(formData.get("qnt")),
      unit: formData.get("unit"),
      done: false,
    };
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
      })
      .then((response) => shoppingListItemSchema.parse(response))
      .then(() => redirect("/"));
  },
  changeDoneStatus: async ({ params, request }: DataFunctionArgs) => {
    const urlSearchParams = new URL(request.url).searchParams;
    const data = await request.formData();
    const done = JSON.parse(data.get("done") as string);
    return fetch(`${API_URL}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ done }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return undefined;
        }
        throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
      })
      .then(() => redirect(`/${urlSearchParams}`));
  },
  deleteItem: ({ params, request }: DataFunctionArgs) => {
    const urlSearchParams = new URL(request.url).searchParams;

    return fetch(`${API_URL}/${params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return undefined;
        }
        throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
      })
      .then(() => redirect(`/?${urlSearchParams.toString()}`));
  },
};