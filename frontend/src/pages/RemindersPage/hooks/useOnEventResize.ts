import { useEditTaskInTodoListMutation } from "pages/SingleTodoListPage/mutations/editTask/editTask.mutation";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

const useOnEventResize = () => {
  const editTaskMutation = useEditTaskInTodoListMutation();

  const onEventResize: withDragAndDropProps["onEventResize"] = (data) => {
    const { start, end } = data;

    // setEvents((currentEvents) => {
    //   const firstEvent = {
    //     start: new Date(start),
    //     end: new Date(end),
    //   };
    //   return [...currentEvents, firstEvent];
    // });
  };

  return onEventResize;
};

export default useOnEventResize;
