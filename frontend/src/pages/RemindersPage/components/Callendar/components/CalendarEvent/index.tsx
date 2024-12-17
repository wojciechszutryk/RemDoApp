import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { memo } from "react";
import { EventProps } from "react-big-calendar";
import { StyledEventWrapper } from "./styles";

interface Props {
  calendarEvent: EventProps<ICallendarEvent>;
}

const CallendarEvent = ({ calendarEvent }: Props): JSX.Element => {
  return (
    <StyledEventWrapper highlight={calendarEvent.event.highlight}>
      {calendarEvent.event.name}
    </StyledEventWrapper>
  );
};

export default memo(CallendarEvent);
