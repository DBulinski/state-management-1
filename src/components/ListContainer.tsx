import * as React from "react";
import { Box, Paper, styled } from "@mui/material";

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const Container = styled(Box)`
  height: 100%;
  padding: 30px;
  max-height: 700px;
  max-width: 600px;
  margin: auto;
`;

export function ListContainer({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <Container className={className}>
      <StyledPaper>{children}</StyledPaper>
    </Container>
  );
}
