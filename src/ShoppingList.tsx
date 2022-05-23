import * as React from "react";
import { Divider, List, styled } from "@mui/material";
import { ShoppingListItemForm } from "./ShoppingListItemForm";
import { ShoppingListRow } from "./ShoppingListRow";
import { ShoppingListItem } from "./shoppingListService";

const ScrollableList = styled(List)`
  flex-grow: 1;
  overflow: auto;
`;

interface ShoppingListProps {
  list: ShoppingListItem[];
  isAddingActive: boolean;
  onStatusChange: (done: Pick<ShoppingListItem, "id" | "done">) => void;
  onDelete: (id: string) => void;
  onSubmit: (item: Omit<ShoppingListItem, "id">) => Promise<void>;
}

export function ShoppingList({
  list,
  isAddingActive,
  onStatusChange,
  onDelete,
  onSubmit,
}: ShoppingListProps): JSX.Element {
  return (
    <>
      <ScrollableList>
        {isAddingActive && <ShoppingListItemForm onSubmit={onSubmit} />}
        {list.map((item) => (
          <ShoppingListRow
            key={item.id}
            onStatusChange={(done) => onStatusChange({ id: item.id, done })}
            onDelete={() => onDelete(item.id)}
            item={item}
          />
        ))}
      </ScrollableList>
      <Divider />
    </>
  );
}
