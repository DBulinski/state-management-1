import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Form, useFetcher, useSearchParams } from "react-router-dom";
import { ShoppingListItem } from "../shoppingListService";

interface ListItemProps {
  item: ShoppingListItem;
}

export function ShoppingListRow({ item }: ListItemProps): JSX.Element | null {
  const [params] = useSearchParams();
  const fetcher = useFetcher();

  const onStatusChange = (done: boolean) => {
    fetcher.submit(
      { done: done.toString() },
      { method: "post", action: `/changeStatus/${item.id}${params.toString()}` }
    );
  };

  return (
    <ListItem
      secondaryAction={
        <Form method="post" action={`/delete/${item.id}`}>
          <IconButton edge="end" type="submit" aria-label="Delete">
            <Delete />
          </IconButton>
        </Form>
      }
    >
      <ListItemButton onClick={() => onStatusChange(!item.done)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.done}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": item.id }}
          />
        </ListItemIcon>
        <ListItemText id={item.id} primary={`${item.name} ${item.qnt} ${item.unit}`} />
      </ListItemButton>
    </ListItem>
  );
}
