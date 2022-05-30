import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const CenteredTypography = styled(Typography)`
  text-align: center;
`;

export function AddingFallback(): JSX.Element {
  return <CenteredTypography color="red">Sorry, adding is not available. Please try again later</CenteredTypography>;
}
