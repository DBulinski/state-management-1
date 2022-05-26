import { Box, Paper, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { shoppingListResponseSchema } from "../shoppingListService";

export function Stats(): JSX.Element {
  const { shoppingList } = shoppingListResponseSchema.parse(useLoaderData());
  const itemsCount = shoppingList.length;
  const doneItemsCount = shoppingList.reduce((acc, item) => (item.done ? acc + 1 : acc), 0);

  return (
    <Paper component={Box} position="fixed" right={15} bottom={15} padding={2}>
      <Typography component={Box} color="green" display="flex" alignItems="center" gap={1}>
        <CheckCircle /> {doneItemsCount}
      </Typography>
      <Typography component={Box} color="error" display="flex" alignItems="center" gap={1}>
        <Cancel /> {itemsCount - doneItemsCount}
      </Typography>
    </Paper>
  );
}
