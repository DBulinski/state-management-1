import * as React from "react";
import { DataBrowserRouter, redirect, Route } from "react-router-dom";
import { ListContainer } from "./ListContainer";
import { Root } from "./routes/Root";
import { ShoppingListItemForm } from "./ShoppingListItemForm";
import { shoppingListService } from "./shoppingListService";

export function App() {
  return (
    <DataBrowserRouter fallbackElement={<ListContainer>Loading...</ListContainer>}>
      <Route path="/" loader={shoppingListService.get} element={<Root />}>
        <Route path="/add" action={shoppingListService.add} element={<ShoppingListItemForm />} />
        <Route path="/delete/:id" action={shoppingListService.deleteItem} />
        <Route path="/changeStatus/:id" action={shoppingListService.changeDoneStatus} />
      </Route>
    </DataBrowserRouter>
  );
}
