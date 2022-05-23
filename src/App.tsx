import * as React from "react";
import { Filters } from "./Filters";
import { ListContainer } from "./ListContainer";
import { ShoppingList } from "./ShoppingList";
import { ShoppingListHeader } from "./ShoppingListHeader";
import { ShoppingListItem, ShoppingListResponse, shoppingListService } from "./shoppingListService";
import { Stats } from "./Stats";

interface FilterParams {
  page: number;
  perPage: number;
  search: string;
}

export function App() {
  const [isAddingActive, setIsAddingActive] = React.useState(false);
  const [params, setParams] = React.useState<FilterParams>({ page: 1, perPage: 20, search: "" });
  const [{ shoppingList, maxPage }, setList] = React.useState<ShoppingListResponse>({ shoppingList: [], maxPage: 0 });

  const fetchShoppingList = React.useCallback(() => shoppingListService.get(params).then(setList), [params]);

  React.useEffect(() => {
    fetchShoppingList();
  }, [fetchShoppingList]);

  React.useEffect(() => {}, []);

  const handleAdd = (item: Omit<ShoppingListItem, "id">) =>
    shoppingListService
      .add(item)
      .then(() => setIsAddingActive(false))
      .then(fetchShoppingList);

  const handleStatusChange = (newStatus: Pick<ShoppingListItem, "id" | "done">) =>
    shoppingListService.changeDoneStatus(newStatus).then(fetchShoppingList);

  const handleDelete = (id: string) => shoppingListService.deleteItem(id).then(fetchShoppingList);

  const updateParam = (key: keyof FilterParams) => (value: number | string) =>
    setParams((oldParams) => ({ ...oldParams, [key]: value }));

  const doneItemsCount = shoppingList.reduce((acc, item) => (item.done ? acc + 1 : acc), 0);

  return (
    <>
      <Stats itemsCount={shoppingList.length} doneItemsCount={doneItemsCount} />
      <ListContainer>
        <ShoppingListHeader
          onSearch={updateParam("search")}
          search={params.search}
          isAddingActive={isAddingActive}
          toggleAddingActive={() => setIsAddingActive((oldIsAddingActive) => !oldIsAddingActive)}
        />
        <ShoppingList
          onSubmit={handleAdd}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          list={shoppingList}
          isAddingActive={isAddingActive}
        />
        <Filters
          page={params.page}
          perPage={params.perPage}
          maxPage={maxPage}
          onPerPageChange={updateParam("perPage")}
          onPageChange={updateParam("page")}
        />
      </ListContainer>
    </>
  );
}
