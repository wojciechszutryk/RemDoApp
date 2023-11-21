import { LAST_CALLENDAR_VIEW_LS_KEY } from "pages/RemindersPage/helpers/LS.keys.const.helper";
import { CalendarAnimation } from "pages/RemindersPage/helpers/enums";
import { Dispatch, SetStateAction, useCallback } from "react";
import { View } from "react-big-calendar";

const useOnView = (
  setContentAnimation: Dispatch<SetStateAction<CalendarAnimation>>
) => {
  return useCallback(
    (view: View) => {
      setContentAnimation((prev) => {
        localStorage.setItem(LAST_CALLENDAR_VIEW_LS_KEY, view);

        if (prev === CalendarAnimation.FADE_IN) {
          return CalendarAnimation.FADE_IN_ALT;
        } else {
          return CalendarAnimation.FADE_IN;
        }
      });
    },
    [setContentAnimation]
  );
};

export default useOnView;
