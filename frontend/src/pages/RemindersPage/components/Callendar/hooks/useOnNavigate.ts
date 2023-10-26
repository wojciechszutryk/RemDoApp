import { CalendarAnimation } from "pages/RemindersPage/helpers/enums";
import { SetStateAction, useCallback } from "react";
import { NavigateAction, View } from "react-big-calendar";

const useOnNavigate = (
  setContentAnimation: (value: SetStateAction<CalendarAnimation>) => void
) => {
  return useCallback(
    (_: Date, __: View, action: NavigateAction) => {
      if (action === "PREV") {
        setContentAnimation((prev) => {
          if (prev === CalendarAnimation.SLIDE_LEFT) {
            return CalendarAnimation.SLIDE_LEFT_ALT;
          } else {
            return CalendarAnimation.SLIDE_LEFT;
          }
        });
      } else if (action === "NEXT") {
        setContentAnimation((prev) => {
          if (prev === CalendarAnimation.SLIDE_RIGHT) {
            return CalendarAnimation.SLIDE_RIGHT_ALT;
          } else {
            return CalendarAnimation.SLIDE_RIGHT;
          }
        });
      }
    },
    [setContentAnimation]
  );
};

export default useOnNavigate;
