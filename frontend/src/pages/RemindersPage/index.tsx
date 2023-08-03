import { memo } from "react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCallendar from "./components/Callendar";
import { StyledRemindersPageWrapper } from "./styles";

const RemindersPage = (): JSX.Element => {
  return (
    <StyledRemindersPageWrapper>
      <BigCallendar />
    </StyledRemindersPageWrapper>
  );
};

export default memo(RemindersPage);
