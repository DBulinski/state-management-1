import { Add, Remove } from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate, useNavigation, useSearchParams } from "react-router-dom";

export function ShoppingListHeader(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [params, setParams] = useSearchParams();
  const isAddingActive = location.pathname.includes("/add");
  const search = params.get("search") ?? "";

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    params.set("search", event.target.value);
    setParams(params);
  };

  const toggleActive = () => navigate({ pathname: isAddingActive ? "/" : "/add", search: params.toString() });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" padding={1}>
        <Typography variant="h4">My list</Typography>
        <IconButton
          aria-label={isAddingActive ? "Close adding form" : "Open adding form"}
          disabled={navigation.state !== "idle"}
          onClick={toggleActive}
        >
          {isAddingActive ? <Remove /> : <Add />}
        </IconButton>
      </Box>
      <Divider />
      <Box padding={1}>
        <TextField variant="standard" fullWidth value={search} onChange={onSearchChange} label="Search" />
      </Box>
      <Divider />
    </Box>
  );
}
