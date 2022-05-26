import { Box, Paper, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

interface StatsProps {
  itemsCount: number;
  doneItemsCount: number;
}

export function Stats({ itemsCount, doneItemsCount }: StatsProps): JSX.Element {
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
