import dayjs from "dayjs";
import { ReminderTodoListId } from "linked-models/reminder/reminder.const";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { createNotifySelectParams } from "../../TaskDialog/components/NotifyForm/helpers";
import { getDefaultTaskFormValues } from "../../TaskDialog/helpers/getDefaultFormValues";
import { IReminderDialogState } from "../models/reminderDialogState.model";

const useCreateDefaultReminderDialogData = (
  defaultData?: Partial<IReminderDialogState>,
  editReminderData?: IReminderDialogState
) => {
  const taskData = editReminderData?.taskId
    ? getDefaultTaskFormValues({
        ...editReminderData,
        id: editReminderData?.taskId,
      })
    : null;

  const defaultStartDate =
    defaultData?.startDate ?? editReminderData?.startDate;
  const notifyDateFromArgs =
    defaultData?.notifyDate ?? editReminderData?.notifyDate;
  // if notifyDate wasn't passed, we set it to 15 mins before startDate as default
  const defaultNotifyDate = notifyDateFromArgs
    ? new Date(notifyDateFromArgs)
    : defaultStartDate
    ? new Date(new Date(defaultStartDate).getTime() - 900000)
    : null;

  const defaultFinishDate =
    defaultData?.finishDate ?? editReminderData?.finishDate;

  const defaultNotifySelectsValues = !!defaultNotifyDate
    ? createNotifySelectParams(
        new Date(defaultNotifyDate),
        defaultStartDate && new Date(defaultStartDate),
        defaultFinishDate && new Date(defaultFinishDate)
      )
    : null;

  return {
    ...taskData,
    text: defaultData?.text || editReminderData?.text || "",
    name: defaultData?.name || editReminderData?.name || "",
    icon:
      defaultData?.icon || editReminderData?.icon || TodoListIconEnum.Reminder,
    startDate:
      defaultData?.startDate || editReminderData?.startDate || dayjs().toDate(),
    finishDate:
      defaultData?.finishDate ||
      editReminderData?.finishDate ||
      dayjs().add(1, "hour").toDate(),
    assignedOwners:
      defaultData?.assignedOwners || editReminderData?.assignedOwners || [],
    assignedUsers:
      defaultData?.assignedUsers || editReminderData?.assignedUsers || [],
    todoListId:
      defaultData?.todoListId ||
      editReminderData?.todoListId ||
      ReminderTodoListId,
    notify: !!defaultNotifyDate,
    minsAccordingToTimePoint:
      defaultNotifySelectsValues?.minsAccordingToTimePoint || 15,
    beforeOrAfter: defaultNotifySelectsValues?.beforeOrAfter || "Before",
    timePoint: defaultNotifySelectsValues?.timePoint || "Start",
    notifyDate: defaultNotifyDate,
  };
};

export default useCreateDefaultReminderDialogData;
