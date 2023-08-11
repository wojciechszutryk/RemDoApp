import { useCallback } from "react";
import { SlotInfo } from "react-big-calendar";

const useOnSelectSlot = () => {
  return useCallback(({ start, end }: SlotInfo) => {
    const title = window.prompt("New Event Name");

    if (title) {
      // setEvents((prev) => [...prev, { start, end, title }]);
    }
  }, []);
};

export default useOnSelectSlot;
