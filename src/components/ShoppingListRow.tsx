import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Form, useFetcher, useNavigation, useSearchParams } from "react-router-dom";
import { routes } from "../App";
import { ShoppingListItem } from "../shoppingListService";

interface ListItemProps {
  item: ShoppingListItem;
}

export function ShoppingListRow({ item }: ListItemProps): JSX.Element | null {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const [params] = useSearchParams();

  const onStatusChange = (done: boolean) => {
    fetcher.submit(
      { done: done.toString() },
      { method: "post", action: `/changeStatus/${item.id}${params.toString()}` }
    );
  };

  const isEditing = navigation.formAction === `${routes.CHANGE_STATUS}/${item.id}`;
  const isRemoving = navigation.formAction === `${routes.DELETE}/${item.id}`;
  const status = isEditing ? JSON.parse(String(navigation.formData?.get("done") ?? "false")) : item.done;

  if (isRemoving) {
    return null;
  }

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
      <ListItemButton disabled={navigation.state === "loading"} onClick={() => onStatusChange(!item.done)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={status}
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
