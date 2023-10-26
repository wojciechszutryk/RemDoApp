import { CalendarAnimation } from "pages/RemindersPage/helpers/enums";
import { Dispatch, SetStateAction, useCallback } from "react";

const useOnView = (
  setContentAnimation: Dispatch<SetStateAction<CalendarAnimation>>
) => {
  return useCallback(() => {
    setContentAnimation((prev) => {
      if (prev === CalendarAnimation.FADE_IN) {
        return CalendarAnimation.FADE_IN_ALT;
      } else {
        return CalendarAnimation.FADE_IN;
      }
    });
  }, [setContentAnimation]);
};

export default useOnView;
