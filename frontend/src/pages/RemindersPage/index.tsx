import { DateCalendar } from "@mui/x-date-pickers";
import { memo } from "react";

const RemindersPage = (): JSX.Element => {
  return (
    <div>
      <DateCalendar />
    </div>
  );
};

export default memo(RemindersPage);
