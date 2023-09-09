import { Box } from "@mui/material";
import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo } from "react";
import { EventProps } from "react-big-calendar";

interface Props {
  calendarEvent: EventProps<ICallendarEvent>;
}

const CallendarEvent = ({ calendarEvent }: Props): JSX.Element => {
  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.primary.main }}>
      {calendarEvent.event.icon && (
        <TodoListIcon
          type={calendarEvent.event.icon}
          sx={{
            height: 17,
            float: "left",
            "& svg": {
              fill: (theme) => theme.palette.primary.main,
              height: 17,
            },
          }}
        />
      )}
      {calendarEvent.title}
    </Box>
  );
};

export default memo(CallendarEvent);
