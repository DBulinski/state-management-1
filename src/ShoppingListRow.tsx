import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Form, useFetcher, useNavigation, useSearchParams } from "react-router-dom";
import { ShoppingListItem } from "./shoppingListService";

interface ListItemProps {
  item: ShoppingListItem;
}

export function ShoppingListRow({ item }: ListItemProps): JSX.Element {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const [params] = useSearchParams();

  const onStatusChange = (done: boolean) => {
    fetcher.submit(
      { done: done.toString() },
      { method: "post", action: `/changeStatus/${item.id}${params.toString()}` }
    );
  };

  return (
    <ListItem
      secondaryAction={
        <Form method="post" replace action={`/delete/${item.id}`}>
          <IconButton disabled={navigation.state === "loading"} edge="end" type="submit" aria-label="Delete">
            <Delete />
          </IconButton>
        </Form>
      }
    >
      <ListItemButton onClick={() => onStatusChange(!item.done)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disabled={navigation.state === "loading"}
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
