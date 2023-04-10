import { createTheme, ThemeProvider } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { memo } from "react";

export const dateCallendarTheme = createTheme();

const RemindersPage = (): JSX.Element => {
  return (
    <div>
      <ThemeProvider theme={dateCallendarTheme}>
        <DateCalendar />
      </ThemeProvider>
    </div>
  );
};

export default memo(RemindersPage);
