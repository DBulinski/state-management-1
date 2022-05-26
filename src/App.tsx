import { LinearProgress } from "@mui/material";
import * as React from "react";
import { DataBrowserRouter, Route } from "react-router-dom";
import { ErrorBoundary } from "./errorHandling/ErrorBoundary";
import { ListContainer } from "./components/ListContainer";
import { Root } from "./routes/Root";
import { AddShoppingListItem } from "./routes/AddShoppingListItem";
import { shoppingListService } from "./shoppingListService";

export const routes = {
  ROOT: "/",
  ADD: "/add",
  DELETE: "/delete",
  CHANGE_STATUS: "/changeStatus",
};

function Fallback() {
  return (
    <ListContainer>
      <LinearProgress />
    </ListContainer>
  );
}

export function App() {
  return (
    <DataBrowserRouter fallbackElement={<Fallback />}>
      <Route path={routes.ROOT} loader={shoppingListService.get} errorElement={<ErrorBoundary />} element={<Root />}>
        <Route
          path={routes.ADD}
          loader={shoppingListService.getUnits}
          action={shoppingListService.add}
          element={<AddShoppingListItem />}
        />
        <Route path={`${routes.DELETE}/:id`} action={shoppingListService.deleteItem} />
        <Route path={`${routes.CHANGE_STATUS}/:id`} action={shoppingListService.changeDoneStatus} />
      </Route>
    </DataBrowserRouter>
  );
}
