import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import { ICallendarEvent } from "../../../helpers/models";
import { useEditReminderMutation } from "../../../mutations/editReminder/editReminder.mutation";

const useEventRangeChange = () => {
  const editReminderMutation = useEditReminderMutation();

  const onEventRangeChange: withDragAndDropProps<ICallendarEvent>["onEventResize"] =
    (data) => {
      const {
        start,
        end,
        event: { todoListId, id },
      } = data;

      editReminderMutation.mutate({
        todoListId,
        taskId: id,
        data: {
          startDate: new Date(start),
          finishDate: new Date(end),
        },
      });
    };

  return onEventRangeChange;
};

export default useEventRangeChange;
