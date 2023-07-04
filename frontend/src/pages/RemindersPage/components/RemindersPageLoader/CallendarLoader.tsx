import { DayCalendarSkeleton } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { memo } from "react";
import { StyledDateCalendar } from "../Callendar/styles";

const initialValue = dayjs();

const CallendarLoader = (): JSX.Element => {
  return (
    <StyledDateCalendar
      renderLoading={() => <DayCalendarSkeleton />}
      defaultValue={initialValue}
      loading={true}
    />
  );
};

export default memo(CallendarLoader);
