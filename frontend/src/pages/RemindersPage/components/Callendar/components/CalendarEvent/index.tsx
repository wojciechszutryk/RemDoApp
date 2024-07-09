import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { memo } from "react";
import { EventProps } from "react-big-calendar";
import { StyledEventWrapper, StyledTodoListIcon } from "./styles";

interface Props {
  calendarEvent: EventProps<ICallendarEvent>;
}

const CallendarEvent = ({ calendarEvent }: Props): JSX.Element => {
  return (
    <StyledEventWrapper>
      {calendarEvent.event.icon && (
        <StyledTodoListIcon type={calendarEvent.event.icon} />
      )}
      {calendarEvent.event.name}
    </StyledEventWrapper>
  );
};

export default memo(CallendarEvent);
