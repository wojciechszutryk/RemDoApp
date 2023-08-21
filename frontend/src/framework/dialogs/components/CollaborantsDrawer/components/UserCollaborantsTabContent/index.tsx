import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useGetUserCollaborantsQuery } from "../../queries/getUserCollaborants.query.";
import EmptyCollaborantsList from "./EmptyCollaborantsList";

interface Props {
  handleOpenInviteTab: () => void;
}

const UserCollaborantsTabContent = ({
  handleOpenInviteTab,
}: Props): JSX.Element => {
  const getUserCollaborantsQuery = useGetUserCollaborantsQuery();

  console.log("getUserCollaborantsQuery", getUserCollaborantsQuery.data);

  if (getUserCollaborantsQuery.isLoading) return <div>Loading...</div>;
  if (
    !getUserCollaborantsQuery.data ||
    getUserCollaborantsQuery.data.length < 1
  )
    return <EmptyCollaborantsList handleOpenInviteTab={handleOpenInviteTab} />;
  return (
    <Box sx={{ p: 3 }}>
      <Typography></Typography>
    </Box>
  );
};

export default memo(UserCollaborantsTabContent);
