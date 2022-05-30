import * as React from "react";
import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Filters } from "../components/Filters";
import { ListContainer } from "../components/ListContainer";
import { ShoppingList } from "../components/ShoppingList";
import { ShoppingListHeader } from "../components/ShoppingListHeader";
import { shoppingListResponseSchema } from "../shoppingListService";
import { Stats } from "../components/Stats";

const StyledLinearProgress = styled(LinearProgress)<{ state: "loading" | "submitting" | "idle" }>`
  visibility: ${({ state }) => (state === "idle" ? "hidden" : "visible")};
`;

export function Root(): JSX.Element {
  const navigation = useNavigation();
  const { shoppingList, maxPage } = shoppingListResponseSchema.parse(useLoaderData());

  return (
    <>
      <Stats />
      <ListContainer>
        <StyledLinearProgress state={navigation.state} />
        <ShoppingListHeader />
        <ShoppingList list={shoppingList} />
        <Filters maxPage={maxPage} />
      </ListContainer>
    </>
  );
}
