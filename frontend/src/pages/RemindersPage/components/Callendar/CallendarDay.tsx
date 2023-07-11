import { useMediaQuery } from "@mui/material";
import { PickersDayProps } from "@mui/x-date-pickers";
import Tooltip from "atomicComponents/atoms/Tooltip";
import { Dayjs } from "dayjs";
import { useDialogs } from "framework/dialogs";
import { IExtendedTaskWithTodoList } from "pages/RemindersPage/helpers/models";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { memo, useCallback } from "react";
import { StyledDay, StyledMoreTasksIcon, StyledPickersDay } from "./styles";

const CallendarDay = (
  props: PickersDayProps<Dayjs> & {
    highlightedDays?: Map<string, IExtendedTaskWithTodoList[]>;
  }
): JSX.Element => {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;

  const isMediumScreen = useMediaQuery("(min-width:500px)");
  const isLargeScreen = useMediaQuery("(min-width:900px)");

  const maxIconsNumber = isLargeScreen ? 6 : isMediumScreen ? 4 : 1;

  const dayTasks =
    !props.outsideCurrentMonth && highlightedDays?.get(day.toString());

  const {
    dialogsActions: { updateReminderDialog, updateReminderListDialog },
  } = useDialogs();

  const handleDayClick = useCallback(() => {
    if (!Array.isArray(dayTasks) || dayTasks?.length === 0) {
      updateReminderDialog({
        visible: true,
      });
    } else {
      updateReminderListDialog({
        visible: true,
        reminders: dayTasks,
      });
    }
  }, [dayTasks, updateReminderDialog, updateReminderListDialog]);

  return (
    <StyledPickersDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      onClick={handleDayClick}
    >
      <StyledDay>{day.date()}</StyledDay>
      {Array.isArray(dayTasks) && dayTasks.length > 0 ? (
        <>
          {dayTasks.map((t, index) => {
            if (index < maxIconsNumber)
              return (
                <Tooltip title={t.text}>
                  <TodoListIcon
                    key={t.id}
                    disableHover
                    type={t.todoList.icon}
                  />
                </Tooltip>
              );
          })}
          {dayTasks.length > maxIconsNumber && (
            <Tooltip
              title={
                <ul>
                  {dayTasks.map((t, index) => {
                    if (index >= maxIconsNumber)
                      return <li key={t.id}>• {t.text}</li>;
                  })}
                </ul>
              }
            >
              <StyledMoreTasksIcon>
                +{dayTasks.length - maxIconsNumber}
              </StyledMoreTasksIcon>
            </Tooltip>
          )}
        </>
      ) : undefined}
    </StyledPickersDay>
  );
};

export default memo(CallendarDay);
