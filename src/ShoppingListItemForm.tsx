import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import { Box, IconButton, ListItem, TextField } from "@mui/material";
import * as React from "react";
import { Form, useNavigation } from "react-router-dom";

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

export function ShoppingListItemForm(): JSX.Element {
  const navigation = useNavigation();

  return (
    <Form method="post">
      <Fieldset disabled={navigation.state === "loading"}>
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
            <TextField variant="standard" label="Unit" name="unit" />
          </Box>
        </ListItem>
      </Fieldset>
    </Form>
  );
}
