import styled from "@emotion/styled";
import { ErrorOutline } from "@mui/icons-material";
import { Button, LinearProgress } from "@mui/material";
import * as React from "react";
import { useRouteError, useNavigate, useNavigation, Link } from "react-router-dom";
import { ListContainer } from "../components/ListContainer";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StyledLinearProgress = styled(LinearProgress)<{ hidden: boolean }>`
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};
`;

export function ErrorBoundary(): JSX.Element {
  const navigation = useNavigation();
  const error = useRouteError();

  const isLoading = navigation.state !== "idle";

  return (
    <ListContainer>
      <StyledLinearProgress hidden={!isLoading} />
      {!isLoading && (
        <ErrorContainer>
          <ErrorOutline fontSize="large" color="error" />
          <h1>Something went wrong</h1>
          <p>{error.message}</p>
          <Button component={Link} to="/">
            Try again
          </Button>
        </ErrorContainer>
      )}
    </ListContainer>
  );
}
