import Dialog from "atomicComponents/atoms/Dialog";
import { memo, useState } from "react";

interface Props {
  contextVisible: boolean;
  onCloseContextAction: () => void;
  children?: React.ReactNode;
}

/**
 * Dialog component that is used to display content of the dialogs that are part of dialogs context. It closes dialog after animation ends. It is necessary because dialogs are loaded lazy and mounted only when their context visibility is set to true.
 */
const ContextDialogImpl = ({
  children,
  contextVisible,
  onCloseContextAction,
}: Props): JSX.Element => {
  const [localVisible, setLocalVisible] = useState(contextVisible);
  return (
    <Dialog
      open={localVisible}
      onClose={() => {
        setLocalVisible(false);
        setTimeout(() => {
          onCloseContextAction();
        }, 300);
      }}
    >
      {children}
    </Dialog>
  );
};

export default memo(ContextDialogImpl);
