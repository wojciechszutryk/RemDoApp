import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { Tooltip, Typography } from "@mui/material";
import { IconButton } from "atomicComponents/atoms/ButtonIcon";
import { useDeleteUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "atomicComponents/organisms/Header/mutations/editUserNotification.mutation";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { NotificationState } from "linked-models/notification/notification.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TopPanelWrapper } from "./styles";

interface Props {
  notificationIDs: string[];
}

const NewNotificationsTopPanel = ({ notificationIDs }: Props): JSX.Element => {
  const { t } = useTranslation();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();
  
  return (
    <TopPanelWrapper>
      <Typography>
        {t(TranslationKeys.Notifications)} : {notificationIDs.length}
      </Typography>
      <IconButton
        onClick={() =>
          editUserNotificationMutation.mutate(
            notificationIDs.map((id) => ({
              editedUserNotificationId: id,
              state: NotificationState.Read,
            }))
          )
        }
      >
        <Tooltip title={t(TranslationKeys.ArchiveAll)}>
          <div>
            <UnarchiveIcon />
          </div>
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => deleteUserNotificationsMutation.mutate(notificationIDs)}
      >
        <Tooltip title={t(TranslationKeys.DeleteAllArchived)}>
          <div>
            <FolderDeleteIcon />
          </div>
        </Tooltip>
      </IconButton>
    </TopPanelWrapper>
  );
};

export default memo(NewNotificationsTopPanel);
