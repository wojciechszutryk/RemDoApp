import groupBy from "lodash.groupby";
import { useCallback, useReducer } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";
import { ICard, IList } from "./models";
import { cardsReducer, listsReducer } from "./reducers";
import { StyledContainer, StyledLists, StyledNewListButton } from "./styles";
import { initialCards, initialLists, reorder } from "./utils";

export function DraggableList() {
  const listsFromLs: IList[] = [];
  const cardsFromLs: ICard[] = [];

  const [cards, cardsDispatch] = useReducer(
    cardsReducer,
    cardsFromLs ? cardsFromLs : initialCards
  );

  const [lists, listsDispatch] = useReducer(
    listsReducer,
    listsFromLs ? listsFromLs : initialLists
  );

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const itemsSplitByListIds = groupBy(cards, (card: any) => {
        return card.listId;
      });

      if (result.source.droppableId === result.destination.droppableId) {
        // Items are in the same list, so just re-order the list array
        const target: ICard[] =
          itemsSplitByListIds[result.destination.droppableId];
        const reordered = reorder<ICard>(
          [...target],
          result.source.index,
          result.destination.index
        );

        // Get rid of old list and replace with updated one
        const filteredCards = cards.filter(
          (card: any) => card.listId !== result.source.droppableId
        );

        cardsDispatch({
          type: "SET",
          payload: { newState: [...filteredCards, ...reordered] },
        });
      } else {
        // Items are in different lists, so just change the item's listId

        const removeByIndex = (list: any[], index: number) => [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ];

        const source = cards.filter(
          (card: ICard) => card.listId === result.source.droppableId
        );
        const sourceWithoutDragged = removeByIndex(source, result.source.index);

        const target = cards.filter(
          (card: ICard) => card.listId === result.destination.droppableId
        );

        const itemWithNewId = {
          ...source[result.source.index],
          listId: result.destination.droppableId,
        };

        target.splice(result.destination.index, 0, itemWithNewId);

        const filteredCards = cards.filter(
          (card: any) =>
            card.listId !== result.source.droppableId &&
            card.listId !== result.destination.droppableId
        );

        cardsDispatch({
          type: "SET",
          payload: {
            newState: [...filteredCards, ...sourceWithoutDragged, ...target],
          },
        });
      }
    },
    [cards]
  );

  return (
    <StyledContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <StyledLists>
          {lists.map((list: IList) => (
            <List
              key={list.id}
              list={list}
              cards={cards.filter((card: ICard) => card.listId === list.id)}
              cardsDispatch={cardsDispatch}
              listsDispatch={listsDispatch}
            />
          ))}
          <StyledNewListButton
            onClick={() => {
              listsDispatch({
                type: "ADD",
                payload: {
                  id: uuidv4(),
                  listTitle: "new list",
                },
              });
            }}
          >
            + New list
          </StyledNewListButton>
        </StyledLists>
      </DragDropContext>
    </StyledContainer>
  );
}

// When list deleted, delete all cards with that listId, otherwise loads of cards hang around in localstorage
// Remove anys
