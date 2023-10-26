import BlockIcon from "@mui/icons-material/Block";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PendingIcon from "@mui/icons-material/Pending";
import RollerShadesIcon from "@mui/icons-material/RollerShades";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { BoxProps } from "@mui/system";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import { StyledTodoListIconWrapper } from "pages/TodoListsPage/components/TodoListIcon/styles";
import { memo } from "react";

interface Props extends BoxProps {
  state: CollaborationState;
}

const CollaborationStateIcon = ({ state, ...boxProps }: Props): JSX.Element => {
  const getIcon = () => {
    switch (state) {
      case CollaborationState.ReOpened: {
        return <RollerShadesIcon />;
      }

      case CollaborationState.Accepted: {
        return <HandshakeIcon />;
      }

      case CollaborationState.Rejected: {
        return <ThumbDownIcon />;
      }

      case CollaborationState.Blocked: {
        return <BlockIcon />;
      }

      default: {
        return <PendingIcon />;
      }
    }
  };

  return (
    <StyledTodoListIconWrapper {...boxProps} disableHover>
      {getIcon()}
    </StyledTodoListIconWrapper>
  );
};

export default memo(CollaborationStateIcon);
