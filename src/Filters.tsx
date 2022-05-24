import { Box, Button, ButtonGroup, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { FilterParams } from "./shoppingListService";

const perPageOptions = [10, 15, 20];

interface FiltersProps {
  maxPage: number;
}

export function Filters({ maxPage }: FiltersProps) {
  const [params, setParams] = useSearchParams();
  const perPage = Number(params.get("perPage") ?? perPageOptions[0]);
  const page = Number(params.get("page") ?? 1);

  const onParamChange = (key: keyof FilterParams, value: number) => {
    params.set(key, String(value));
    setParams(params);
  };

  return (
    <Box display="flex" justifyContent="space-between" padding={1}>
      <ButtonGroup>
        {perPageOptions.map((option) => (
          <Button key={option} onClick={() => onParamChange("perPage", option)} disabled={option === perPage}>
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Pagination page={page} onChange={(_, page) => onParamChange("page", page)} count={maxPage} />
    </Box>
  );
}
