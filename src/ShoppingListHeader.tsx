import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import * as React from "react";

interface ShoppingListHeaderProps {
  isAddingActive: boolean;
  toggleAddingActive: () => void;
  search: string;
  onSearch: (newSearch: string) => void;
}

export function ShoppingListHeader({
  isAddingActive,
  toggleAddingActive,
  search,
  onSearch,
}: ShoppingListHeaderProps): JSX.Element {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" padding={1}>
        <Typography variant="h4">My list</Typography>
        <IconButton onClick={toggleAddingActive}>{isAddingActive ? <Remove /> : <Add />}</IconButton>
      </Box>
      <Divider />
      <Box padding={1}>
        <TextField
          variant="standard"
          fullWidth
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          label="Search"
        />
      </Box>
      <Divider />
    </Box>
  );
}
