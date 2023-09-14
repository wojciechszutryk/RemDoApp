import { Divider, List } from "@mui/material";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { memo } from "react";
import CollabrantListItem from "../CollaborantListItem";
import EmptyCollaborantsList from "./EmptyCollaborantsList";

interface Props {
  handleOpenInviteTab: () => void;
  collaborants: ICollaborantDTO[];
}

const UserCollaborantsTabContent = ({
  collaborants,
  handleOpenInviteTab,
}: Props): JSX.Element => {
  if (!collaborants || collaborants.length < 1)
    return <EmptyCollaborantsList handleOpenInviteTab={handleOpenInviteTab} />;
  return (
    <List>
      {collaborants.map((collaborant, index) => (
        <>
          {index > 0 && index < collaborants.length - 1 && <Divider />}
          <CollabrantListItem key={collaborant.id} collaborant={collaborant} />
        </>
      ))}
    </List>
  );
};

export default memo(UserCollaborantsTabContent);
