import ArchiveIcon from "@mui/icons-material/Archive";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { useEditUserNotificationsMutation } from "framework/notifications/mutations/editUserNotification.mutation";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyledTopPanelWrapper } from "../styles";

interface Props {
  notificationIDs: string[];
}

const ActiveNotificationsTopPanel = ({
  notificationIDs,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  return (
    <StyledTopPanelWrapper>
      <Typography>
        {t(TranslationKeys.Notifications)}: {notificationIDs.length}
      </Typography>
      <Tooltip title={t(TranslationKeys.ArchiveAll)}>
        <IconButton
          onClick={() =>
            editUserNotificationMutation.mutate(
              notificationIDs.map((id) => ({
                editedUserNotificationId: id,
                state: UserNotificationState.Archived,
              }))
            )
          }
        >
          <ArchiveIcon color="secondary" />
        </IconButton>
      </Tooltip>
    </StyledTopPanelWrapper>
  );
};

export default memo(ActiveNotificationsTopPanel);
