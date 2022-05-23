import { Box, Button, ButtonGroup, Pagination } from "@mui/material";

interface FiltersProps {
  page: number;
  maxPage: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  onPerPageChange: (newPerPage: number) => void;
}

const perPageOptions = [10, 15, 20];

export function Filters({ page, maxPage, perPage, onPageChange, onPerPageChange }: FiltersProps) {
  return (
    <Box display="flex" justifyContent="space-between" padding={1}>
      <ButtonGroup>
        {perPageOptions.map((option) => (
          <Button key={option} onClick={() => onPerPageChange(option)} disabled={option === perPage}>
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <Pagination page={page} onChange={(_, page) => onPageChange(page)} count={maxPage} />
    </Box>
  );
}
