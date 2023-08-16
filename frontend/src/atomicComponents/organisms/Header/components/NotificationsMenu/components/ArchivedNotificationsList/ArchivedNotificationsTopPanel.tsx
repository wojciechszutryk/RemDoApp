import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useDeleteUserNotificationsMutation } from "framework/notifications/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "framework/notifications/mutations/editUserNotification.mutation";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { Dispatch, memo, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { StyledTopPanelWrapper } from "../styles";

interface Props {
  notificationIDs: string[];
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

const NewNotificationsTopPanel = ({
  notificationIDs,
  expanded,
  setExpanded,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();

  return (
    <StyledTopPanelWrapper
      onClick={() => setExpanded((expanded) => !expanded)}
      cursorPointer
    >
      <Typography>
        {t(TranslationKeys.ArchivedNotifications)} : {notificationIDs.length}
      </Typography>
      {expanded && (
        <div>
          <Tooltip title={t(TranslationKeys.UnarchiveAll)}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                editUserNotificationMutation.mutate(
                  notificationIDs.map((id) => ({
                    editedUserNotificationId: id,
                    state: UserNotificationState.Read,
                  }))
                );
              }}
            >
              <UnarchiveIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t(TranslationKeys.DeleteAllArchived)}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteUserNotificationsMutation.mutate(notificationIDs);
              }}
            >
              <FolderDeleteIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </StyledTopPanelWrapper>
  );
};

export default memo(NewNotificationsTopPanel);
