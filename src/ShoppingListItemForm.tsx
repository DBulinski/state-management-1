import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import { Box, IconButton, ListItem, MenuItem, TextField } from "@mui/material";
import * as React from "react";
import { ShoppingListItem, shoppingListService } from "./shoppingListService";

const StyledSelect = styled(TextField)`
  min-width: 30%;
`;

interface ItemFormProps {
  onSubmit: (item: Omit<ShoppingListItem, "id">) => Promise<void>;
}

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  qnt: HTMLInputElement;
  unit: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function ShoppingListItemForm({ onSubmit }: ItemFormProps): JSX.Element {
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const [units, setUnits] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    shoppingListService.getUnits().then(setUnits);
  }, []);

  const handleSubmit = async (event: React.FormEvent<UsernameFormElement>) => {
    const { name, qnt, unit } = event.currentTarget.elements;
    event.preventDefault();
    await onSubmit({
      done: false,
      name: name.value,
      qnt: Number(qnt.value),
      unit: unit.value,
    }).then(() => {
      name.value = "";
      qnt.value = "";
      unit.value = "";
      firstInputRef.current?.focus();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ListItem
        secondaryAction={
          <IconButton type="submit" edge="end" aria-label="Delete">
            <Done />
          </IconButton>
        }
      >
        <Box display="flex" justifyContent="center" gap={2} width="100%">
          <TextField autoFocus variant="standard" label="Product" name="name" />
          <TextField variant="standard" label="Quantity" type="number" name="qnt" />
          <StyledSelect select variant="standard" label="Unit" name="unit">
            {units?.map((unit) => (
              <MenuItem value={unit}>{unit}</MenuItem>
            ))}
          </StyledSelect>
        </Box>
      </ListItem>
    </form>
  );
}
