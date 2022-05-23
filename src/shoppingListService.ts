class ShoppingListHttpError extends Error {}

export interface ShoppingListItem {
  id: string;
  name: string;
  qnt: number;
  unit: string;
  done: boolean;
}

export interface FilterParams {
  page: number;
  perPage: number;
  search: string;
}

export interface ShoppingListResponse {
  shoppingList: ShoppingListItem[];
  maxPage: number;
}

const API_URL = "/api/shoppingList";

export const shoppingListService = {
  get: (params: Partial<FilterParams> = {}, abort?: AbortController): Promise<ShoppingListResponse> => {
    const urlParams = new URLSearchParams();
    if (params.page) {
      urlParams.set("page", String(params.page));
    }
    if (params.perPage) {
      urlParams.set("perPage", String(params.perPage));
    }
    if (params.search) {
      urlParams.set("search", params.search);
    }

    return fetch(`${API_URL}?${urlParams.toString()}`, { signal: abort?.signal }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
    });
  },
  add: (item: Omit<ShoppingListItem, "id">, abort?: AbortController) =>
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
      signal: abort?.signal,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
    }),
  changeDoneStatus: ({ id, done }: Pick<ShoppingListItem, "id" | "done">, abort?: AbortController) =>
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ done }),
      headers: { "Content-Type": "application/json" },
      signal: abort?.signal,
    }).then((res) => {
      if (res.ok) {
        return undefined;
      }
      throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
    }),
  deleteItem: (id: string, abort?: AbortController) =>
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      signal: abort?.signal,
    }).then((res) => {
      if (res.ok) {
        return undefined;
      }
      throw new ShoppingListHttpError(`Request failed with status: ${res.status}`);
    }),
};
