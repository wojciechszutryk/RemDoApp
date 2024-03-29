import CloseIcon from "@mui/icons-material/Close";
import { DialogProps, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, memo } from "react";
import { StyledCloseButton, StyledDialog, StyledInnerWrapper } from "./styles";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} in={true} {...props} />;
});

const Dialog = ({ children, ...props }: DialogProps): JSX.Element => {
  return (
    <StyledDialog {...props} TransitionComponent={Transition} keepMounted>
      <StyledInnerWrapper>{children}</StyledInnerWrapper>

      {props.onClose && (
        <StyledCloseButton onClick={(e) => props.onClose?.(e, "backdropClick")}>
          <CloseIcon />
        </StyledCloseButton>
      )}
    </StyledDialog>
  );
};

export default memo(Dialog);
