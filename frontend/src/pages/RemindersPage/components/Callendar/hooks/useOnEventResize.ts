import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import { ICallendarEvent } from "../../../helpers/models";
import { useEditReminderMutation } from "../../../mutations/editReminder/editReminder.mutation";

const useOnEventResize = () => {
  const editReminderMutation = useEditReminderMutation();

  const onEventResize: withDragAndDropProps<ICallendarEvent>["onEventResize"] =
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

  return onEventResize;
};

export default useOnEventResize;
