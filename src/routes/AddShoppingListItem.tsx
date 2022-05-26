import * as React from "react";
import styled from "@emotion/styled";
import { Done } from "@mui/icons-material";
import { Box, IconButton, ListItem, TextField, MenuItem, Typography } from "@mui/material";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import z from "zod";
import { routes } from "../App";
import { ShoppingListRow } from "../components/ShoppingListRow";

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`;

const StyledSelect = styled(TextField)`
  min-width: 30%;
`;

const parseAddedData = (formData: FormData) => ({
  id: "new",
  name: String(formData?.get("name")),
  qnt: Number(formData?.get("qnt")),
  unit: String(formData?.get("unit")),
  done: false,
});

export function AddShoppingListItem(): JSX.Element {
  const units = z.array(z.string()).parse(useLoaderData());
  const errorData = useActionData();
  const isError = Boolean(errorData?.message);
  const navigation = useNavigation();
  const isAdding = navigation.formAction === routes.ADD;

  if (isAdding && navigation.formData) {
    return <ShoppingListRow item={parseAddedData(navigation.formData)} />;
  }

  return (
    <Form method="post">
      <Fieldset aria-errormessage={errorData?.message} disabled={navigation.state !== "idle"}>
        <ListItem
          secondaryAction={
            <IconButton type="submit" edge="end" aria-label="Submit">
              <Done />
            </IconButton>
          }
        >
          <Box width="100%">
            <Box display="flex" justifyContent="center" gap={2} width="100%">
              <TextField
                error={isError}
                defaultValue={errorData?.data.name}
                autoFocus
                variant="standard"
                label="Product"
                name="name"
              />
              <TextField
                error={isError}
                defaultValue={errorData?.data.qnt}
                variant="standard"
                label="Quantity"
                type="number"
                name="qnt"
              />
              <StyledSelect
                error={isError}
                defaultValue={errorData?.data.unit}
                select
                variant="standard"
                label="Unit"
                name="unit"
              >
                {units.map((unit) => (
                  <MenuItem value={unit}>{unit}</MenuItem>
                ))}
              </StyledSelect>
            </Box>
            {isError && (
              <Typography pt={1} color="error" fontSize="small">
                {errorData.message}
              </Typography>
            )}
          </Box>
        </ListItem>
      </Fieldset>
    </Form>
  );
}
