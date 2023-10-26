import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";
import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";

const useOnEventDrop = () => {
  return useCallback((data: EventInteractionArgs<ICallendarEvent>) => {
    console.log(data);
  }, []);
};

export default useOnEventDrop;
