import { Delete, Edit } from "@mui/icons-material";
import { Checkbox, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ShoppingListItem } from "./shoppingListService";

interface ListItemProps {
  item: ShoppingListItem;
  onStatusChange: (done: boolean) => void;
  onDelete: () => void;
}

export function ShoppingListRow({ item, onStatusChange, onDelete }: ListItemProps): JSX.Element {
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={onDelete} edge="end" aria-label="Delete">
          <Delete />
        </IconButton>
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
