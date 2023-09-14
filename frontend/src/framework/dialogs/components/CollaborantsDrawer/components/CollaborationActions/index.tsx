import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import UndoIcon from "@mui/icons-material/Undo";
import { Box, ListItem, Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { ICollaborantDTO } from "linked-models/collaboration/collaboration.dto";
import { CollaborationState } from "linked-models/collaboration/collaboration.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useAcceptCollaborationMutation } from "../../mutations/acceptUserCollaboration.mutation";
import { useDeleteCollaborationMutation } from "../../mutations/deleteUserCollaboration.mutation";
import { useInviteUserToCollaborationMutation } from "../../mutations/inviteUserToCollaboration.mutation";
import { useRejectCollaborationMutation } from "../../mutations/rejectUserCollaboration.mutation";
import CollaborationStateIcon from "../CollaborationStateIcon";

interface Props {
  collaborant: ICollaborantDTO;
}

const buttonProps = {
  variant: "outlined" as const,
  color: "secondary" as const,
};

const typographyProps = {
  textAlign: "center" as const,
};

const CollaborationActions = ({ collaborant }: Props): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const acceptCollaborationMutation = useAcceptCollaborationMutation();
  const rejectCollaborationMutation = useRejectCollaborationMutation();
  const deleteCollaborationMutation = useDeleteCollaborationMutation();
  const inviteUserToCollaborationMutation =
    useInviteUserToCollaborationMutation();

  const isCurrentUserCreator = collaborant.creator.id === currentUser?.id;
  const isCurrentUserCollaborant = collaborant.user.id === currentUser?.id;

  if (!isCurrentUserCreator && !isCurrentUserCollaborant) return <></>;

  let content = <></>;

  if (collaborant.state === CollaborationState.Pending) {
    if (isCurrentUserCreator)
      content = (
        <Typography {...typographyProps}>
          {t(TranslationKeys.WaitingForAcceptance)}
        </Typography>
      );
    else
      content = (
        <>
          <Typography {...typographyProps}>
            {t(TranslationKeys.WaitingForAcceptance)}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              {...buttonProps}
              onClick={() => acceptCollaborationMutation.mutate(collaborant)}
              startIcon={
                <CollaborationStateIcon state={CollaborationState.Accepted} />
              }
            >
              {t(TranslationKeys.Accept)}
            </Button>

            <Button
              {...buttonProps}
              onClick={() => rejectCollaborationMutation.mutate(collaborant)}
              startIcon={
                <CollaborationStateIcon state={CollaborationState.Rejected} />
              }
            >
              {t(TranslationKeys.Reject)}
            </Button>
          </Box>{" "}
        </>
      );
  } else if (collaborant.state === CollaborationState.ReOpened) {
    if (isCurrentUserCreator)
      content = (
        <Typography {...typographyProps}>
          {t(TranslationKeys.WaitingForAcceptance)}
        </Typography>
      );
    else
      content = (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            {...buttonProps}
            onClick={() => acceptCollaborationMutation.mutate(collaborant)}
          >
            <CollaborationStateIcon state={CollaborationState.Accepted} />
            {t(TranslationKeys.Accept)}
          </Button>
          <Button
            {...buttonProps}
            onClick={() => rejectCollaborationMutation.mutate(collaborant)}
            startIcon={
              <CollaborationStateIcon state={CollaborationState.Blocked} />
            }
          >
            {t(TranslationKeys.Block)}
          </Button>
        </Box>
      );
  } else if (collaborant.state === CollaborationState.Accepted) {
    content = (
      <>
        <Typography {...typographyProps}>
          {t(TranslationKeys.AlreadyCollaborant)}
        </Typography>
        <Button
          {...buttonProps}
          onClick={() => deleteCollaborationMutation.mutate(collaborant.id)}
          startIcon={<PersonRemoveIcon />}
        >
          {t(TranslationKeys.DeleteCollaboration)}
        </Button>
      </>
    );
  } else if (collaborant.state === CollaborationState.Rejected) {
    if (isCurrentUserCreator)
      content = (
        <>
          <Typography {...typographyProps}>
            {t(TranslationKeys.UserRejectedCollaboration)}
          </Typography>
          <Button
            {...buttonProps}
            onClick={() =>
              inviteUserToCollaborationMutation.mutate(collaborant.user)
            }
            startIcon={
              <CollaborationStateIcon state={CollaborationState.ReOpened} />
            }
          >
            {t(TranslationKeys.InviteAgain)}
          </Button>
        </>
      );
    else
      content = (
        <>
          <Typography {...typographyProps}>
            {t(TranslationKeys.YouRejectedButCanAccept)}
          </Typography>
          <Button
            {...buttonProps}
            onClick={() => acceptCollaborationMutation.mutate(collaborant)}
            startIcon={
              <CollaborationStateIcon state={CollaborationState.Accepted} />
            }
          >
            {t(TranslationKeys.Accept)}
          </Button>
        </>
      );
  } else if (collaborant.state === CollaborationState.Blocked) {
    if (isCurrentUserCreator)
      content = (
        <Typography {...typographyProps}>
          {t(TranslationKeys.CollaborationBlocked)}
        </Typography>
      );
    else
      content = (
        <>
          <Typography {...typographyProps}>
            {t(TranslationKeys.YouBlockedButCanUnblock)}
          </Typography>
          <Button
            {...buttonProps}
            onClick={() => deleteCollaborationMutation.mutate(collaborant.id)}
            startIcon={<UndoIcon />}
          >
            {t(TranslationKeys.Unblock)}
          </Button>
        </>
      );
  }

  return (
    <ListItem
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
      }}
    >
      {content}
    </ListItem>
  );
};

export default memo(CollaborationActions);
