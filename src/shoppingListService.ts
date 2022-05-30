import { DataFunctionArgs } from "@remix-run/router/utils";
import { redirect } from "react-router-dom";
import z from "zod";

class ShoppingListHttpError extends Error {}

export const shoppingListItemSchema = z.object({
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
  get: ({ request, signal }: DataFunctionArgs): Promise<ShoppingListResponse> => {
    const urlParams = new URL(request.url).searchParams;

    return fetch(`${API_URL}?${urlParams}`, { signal })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
      })
      .then((response) => shoppingListResponseSchema.parse(response));
  },
  add: async ({ request, signal }: DataFunctionArgs) => {
    const formData = await request.formData();
    const item = {
      name: formData.get("name"),
      qnt: formData.get("qnt") ? Number(formData.get("qnt")) : "",
      unit: formData.get("unit"),
      done: false,
    };
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(item),
      signal,
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return { message: (await response.json()).message, data: item };
    }
    shoppingListItemSchema.parse(await response.json());
    return redirect("/");
  },
  changeDoneStatus: async ({ params, request, signal }: DataFunctionArgs) => {
    const urlSearchParams = new URL(request.url).searchParams;
    const data = await request.formData();
    const done = JSON.parse(data.get("done") as string);
    const response = await fetch(`${API_URL}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ done }),
      signal,
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return redirect(`/${urlSearchParams}`);
    }
    throw new ShoppingListHttpError(`Request failed with status: ${response.status}`);
  },
  deleteItem: async ({ params, request, signal }: DataFunctionArgs) => {
    const urlSearchParams = new URL(request.url).searchParams;

    const response = await fetch(`${API_URL}/${params.id}`, {
      method: "DELETE",
      signal,
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return redirect(`/?${urlSearchParams.toString()}`);
    }
    throw new ShoppingListHttpError(`Request failed with status: ${response.status}`);
  },
  getUnits: async ({ signal }: DataFunctionArgs): Promise<Response> => {
    const response = await fetch(`${API_URL}/units`, { signal });
    if (response.ok) {
      return response;
    } else {
      throw new ShoppingListHttpError(`Request failed with status: ${response.status}`);
    }
  },
};
