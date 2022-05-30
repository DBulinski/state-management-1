import * as React from "react";
import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import { Box, IconButton, ListItem, TextField, MenuItem } from "@mui/material";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import z from "zod";

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const StyledSelect = styled(TextField)`
  min-width: 30%;
`;

export function AddShoppingListItem(): JSX.Element {
  const units = z.array(z.string()).parse(useLoaderData());
  const navigation = useNavigation();

  return (
    <Form method="post">
      <Fieldset disabled={navigation.state !== "idle"}>
        <ListItem
          secondaryAction={
            <IconButton type="submit" edge="end" aria-label="Submit">
              <Done />
            </IconButton>
          }
        >
          <Box width="100%">
            <Box display="flex" justifyContent="center" gap={2} width="100%">
              <TextField autoFocus variant="standard" label="Product" name="name" />
              <TextField variant="standard" label="Quantity" type="number" name="qnt" />
              <StyledSelect select variant="standard" label="Unit" name="unit">
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </StyledSelect>
            </Box>
          </Box>
        </ListItem>
      </Fieldset>
    </Form>
  );
}
