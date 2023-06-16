import React, { Dispatch, SetStateAction } from "react";

interface Args {
  setDrawerState: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  onOpen?: () => void;
}

const useToggleDrawer = ({ setDrawerState, onClose, onOpen }: Args) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (open === true && !!onOpen) {
        onOpen();
      } else if (!!onClose) {
        onClose();
      }

      setDrawerState(open);
    };

  return toggleDrawer;
};

export default useToggleDrawer;
