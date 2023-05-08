import { FunctionComponent, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { ICard, IList } from "../../models";
import Card from "../Card";
import { StyledContainer } from "./styles";

interface IListProps {
  list: IList;
  cards: ICard[];
  cardsDispatch: any;
  listsDispatch: any;
}

const List: FunctionComponent<IListProps> = ({
  list,
  cards,
  cardsDispatch,
  listsDispatch,
}) => {
  const [isEditingName, setEditingName] = useState(false);

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: "white",
    padding: "10px",
    marginBottom: "5px",
    borderRadius: "5px",
    borderBottom: "1px solid rgb(178,185,197)",

    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    minHeight: 70,
  });

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    listsDispatch({
      type: "UPDATE_NAME",
      payload: { id: list.id, value },
    });
  };

  return (
    <StyledContainer>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <>
              {cards.map((post: ICard, index: number) => (
                <Draggable
                  key={post.id}
                  index={index}
                  draggableId={`draggable-${post.id}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Card
                        key={post.id}
                        text={post.text}
                        id={post.id}
                        cardsDispatch={cardsDispatch}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        onClick={(evt) =>
          cardsDispatch({
            type: "ADD",
            payload: {
              listId: list.id,
              text: "new item",
              id: uuidv4(),
            },
          })
        }
      >
        + Add a card
      </button>
    </StyledContainer>
  );
};

export default List;
