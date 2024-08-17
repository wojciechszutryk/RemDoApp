import CloseIcon from "@mui/icons-material/Close";
import { DialogProps, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, memo } from "react";
import {
  StyledCloseButton,
  StyledDialog,
  StyledDialogTitle,
  StyledInnerWrapper,
} from "./styles";

interface Props extends DialogProps {
  title?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} in={true} {...props} />;
});

const Dialog = ({ children, title, ...props }: Props): JSX.Element => {
  return (
    <StyledDialog {...props} TransitionComponent={Transition} keepMounted>
      {title && <StyledDialogTitle variant="h4">{title}</StyledDialogTitle>}
      <StyledInnerWrapper withTitle={!!title}>{children}</StyledInnerWrapper>

      {props.onClose && (
        <StyledCloseButton onClick={(e) => props.onClose?.(e, "backdropClick")}>
          <CloseIcon />
        </StyledCloseButton>
      )}
    </StyledDialog>
  );
};

export default memo(Dialog);
