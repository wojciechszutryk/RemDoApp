import ArchiveIcon from "@mui/icons-material/Archive";
import { Tooltip, Typography } from "@mui/material";
import { IconButton } from "atomicComponents/atoms/ButtonIcon";
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
  return (
    <TopPanelWrapper>
      <Typography>
        {t(TranslationKeys.Notifications)}: {notificationIDs.length}
      </Typography>
      <IconButton
        onClick={() =>
          editUserNotificationMutation.mutate(
            notificationIDs.map((id) => ({
              editedUserNotificationId: id,
              state: NotificationState.Archived,
            }))
          )
        }
      >
        <Tooltip title={t(TranslationKeys.ArchiveAll)}>
          <div>
            <ArchiveIcon />
          </div>
        </Tooltip>
      </IconButton>
    </TopPanelWrapper>
  );
};

export default memo(NewNotificationsTopPanel);
