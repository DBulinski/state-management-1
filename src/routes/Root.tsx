import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";
import * as React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import { Filters } from "../Filters";
import { ListContainer } from "../ListContainer";
import { ShoppingList } from "../ShoppingList";
import { ShoppingListHeader } from "../ShoppingListHeader";
import { shoppingListResponseSchema } from "../shoppingListService";
import { Stats } from "../Stats";

const StyledLinearProgress = styled(LinearProgress)<{ $hidden: boolean }>`
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
`;

export function Root(): JSX.Element {
  const navigation = useNavigation();
  const { shoppingList, maxPage } = shoppingListResponseSchema.parse(useLoaderData());
  const doneItemsCount = shoppingList.reduce((acc, item) => (item.done ? acc + 1 : acc), 0);

  return (
    <>
      <Stats itemsCount={shoppingList.length} doneItemsCount={doneItemsCount} />
      <ListContainer>
        <StyledLinearProgress $hidden={navigation.state !== "loading"} />
        <ShoppingListHeader />
        <ShoppingList list={shoppingList} />
        <Filters maxPage={maxPage} />
      </ListContainer>
    </>
  );
}
