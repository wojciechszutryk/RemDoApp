import { ICallendarEvent } from "pages/RemindersPage/helpers/models";
import { useCallback } from "react";

const useOnSelectEvent = () => {
  return useCallback((event: ICallendarEvent) => {
    // window.alert(event.title);
  }, []);
};

export default useOnSelectEvent;
