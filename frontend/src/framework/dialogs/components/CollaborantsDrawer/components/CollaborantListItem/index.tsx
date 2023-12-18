import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, ListItemAvatar } from "@mui/material";
import UserAvatar from "atomicComponents/organisms/UserAvatar";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { StyledCollaborantListItemText } from "../../styles";
import CollaborationActions from "../CollaborationActions";
import CollaborationStateIcon from "../CollaborationStateIcon";
import { StyledCollListItem } from "./styles";

interface Props {
  collaborant: ICollaborantDTO;
}

const CollabrantListItem = ({ collaborant }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useCurrentUser();
  const { collaborationId } = useParams();

  const handleClick = () => {
    setOpen(!open);
  };

  const isCurrentUserCreator = collaborant.user.id === currentUser?.id;
  const isCurrentUserCollaborant = collaborant.creator.id === currentUser?.id;

  if (!isCurrentUserCreator && !isCurrentUserCollaborant) return <></>;

  const collaborantPublicData = isCurrentUserCreator
    ? collaborant.creator
    : collaborant.user;

  return (
    <>
      <StyledCollListItem onClick={handleClick} highlighted={collaborationId == collaborant.id}>
        <ListItemAvatar sx={{ position: "relative" }}>
          <UserAvatar userData={collaborantPublicData} />
          <CollaborationStateIcon
            state={collaborant.state}
            sx={{
              position: "absolute",
              top: -5,
              right: 5,
              transform: "scale(0.8)",
            }}
          />
        </ListItemAvatar>
        <StyledCollaborantListItemText
          primary={collaborantPublicData.displayName}
          secondary={collaborantPublicData.email}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledCollListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CollaborationActions collaborant={collaborant} />
      </Collapse>
    </>
  );
};

export default CollabrantListItem;
