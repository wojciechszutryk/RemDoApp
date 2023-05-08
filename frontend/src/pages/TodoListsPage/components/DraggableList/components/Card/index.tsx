import { FunctionComponent, useState } from "react";
import {
  StyledContainer,
  StyledLeft,
  StyledRight,
  StyledSaveButton,
} from "./styles";

interface ICard {
  text: string;
  id: string;
  cardsDispatch: any;
}

const Card: FunctionComponent<ICard> = ({ text, id, cardsDispatch }) => {
  const [isEdit, setIsEdit] = useState(false);

  const onDeleteClick = () => {
    cardsDispatch({ type: "REMOVE", payload: { id } });
  };

  const onEditClick = (evt: any, id: string) => {
    setIsEdit(true);
  };

  const handleNameChange = (evt: any) => {
    const { value } = evt.target;
    cardsDispatch({
      type: "EDIT",
      payload: { id, editValue: value },
    });
  };

  return (
    <StyledContainer>
      <StyledLeft>
        {isEdit ? (
          <input
            type="text"
            defaultValue={text}
            onChange={handleNameChange}
            onBlur={() => setIsEdit(false)}
            onKeyPress={(evt) => {
              if (evt.key === "Enter") {
                setIsEdit(false);
              }
            }}
          />
        ) : (
          text
        )}
      </StyledLeft>
      <StyledRight>
        {isEdit ? (
          <StyledSaveButton onClick={() => setIsEdit(false)}>
            Save
          </StyledSaveButton>
        ) : (
          <>
            <button onClick={(evt) => onEditClick(evt, id)}>✎</button>
            <button onClick={onDeleteClick}>&times;</button>
          </>
        )}
      </StyledRight>
    </StyledContainer>
  );
};

export default Card;
