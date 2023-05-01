import { AlertProps, Collapse, CollapseProps } from "@mui/material";
import { Alert } from "atomicComponents/atoms/Alert";
import { memo } from "react";

export interface CollapsableAlertProps {
  alertProps?: AlertProps;
  collapseProps?: CollapseProps;
  children?: React.ReactNode;
}

const CollapsableAlert = ({
  alertProps,
  collapseProps,
  children,
}: CollapsableAlertProps): JSX.Element => {
  return (
    <Collapse {...collapseProps}>
      <Alert {...alertProps}>{children}</Alert>
    </Collapse>
  );
};

export default memo(CollapsableAlert);
