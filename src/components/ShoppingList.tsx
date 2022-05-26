import { Outlet } from "react-router-dom";
import * as React from "react";
import { Divider, List, styled } from "@mui/material";
import { ShoppingListRow } from "./ShoppingListRow";
import { ShoppingListItem } from "../shoppingListService";

const ScrollableList = styled(List)`
  flex-grow: 1;
  overflow: auto;
`;

interface ShoppingListProps {
  list: ShoppingListItem[];
}

export function ShoppingList({ list }: ShoppingListProps): JSX.Element {
  return (
    <>
      <ScrollableList>
        <Outlet />
        {list.map((item) => (
          <ShoppingListRow key={item.id} item={item} />
        ))}
      </ScrollableList>
      <Divider />
    </>
  );
}
