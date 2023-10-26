import { ListItemIcon } from "@mui/material";
import ExtendableUserAvatar from "atomicComponents/organisms/UserAvatar/ExtendableUserAvatar";
import { useDialogs } from "framework/dialogs";
import { createCollaborationNotificationMsg } from "framework/notifications/helpers/createCollaborationNotificationMsg";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { IExtendedNotification } from "..";
import {
  StyledFreshIcon,
  StyledListItem,
  StyledListItemText,
} from "../../styles";

interface Props {
  extendedNotification: IExtendedNotification;
  hideNotificationMenu: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const CollaborantNotificationContent = ({
  extendedNotification,
  hideNotificationMenu,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { dialogsActions } = useDialogs();
  return (
    <StyledListItem>
      {extendedNotification.state === UserNotificationState.Fresh && (
        <StyledFreshIcon />
      )}
      <ListItemIcon>
        <ExtendableUserAvatar userData={extendedNotification.creator} />
      </ListItemIcon>
      <StyledListItemText
        primary={
          <span>
            {createCollaborationNotificationMsg(
              extendedNotification.action,
              extendedNotification.creator.displayName,
              t
            )}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dialogsActions.updateCollaborantsDrawer({ visible: true });
                hideNotificationMenu(e);
              }}
            >
              {` - `}
              {t(TranslationKeys.Details)}
            </span>
          </span>
        }
      />
    </StyledListItem>
  );
};

export default memo(CollaborantNotificationContent);
