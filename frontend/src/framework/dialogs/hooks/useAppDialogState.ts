import { useState } from "react";

/**
 * Hook used to handle open, onClose state of the dialogs that are part of dialogs context. It closes dialog after animation ends. It is necessary because dialogs are loaded lazy and mounted only when their context visibility is set to true.
 */
const useAppDialogState = <T extends { visible: boolean }>(
  contextVisible: boolean,
  onCloseContextAction: (payload: T) => void
): [boolean, () => void] => {
  const [localVisible, setLocalVisible] = useState(contextVisible);

  const onClose = () => {
    setLocalVisible(false);
    setTimeout(() => {
      onCloseContextAction({ visible: false } as T);
    }, 300);
  };

  return [localVisible, onClose];
};

export default useAppDialogState;
