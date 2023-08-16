import useCreateNotificationMessage from "framework/notificationSocket/useCreateNotificationMessage/useCreateNotificationMessage";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo } from "react";
import { IExtendedNotification } from "..";
import {
  StyledFreshIcon,
  StyledListItem,
  StyledListItemText,
} from "../../styles";

interface Props {
  extendedNotification: IExtendedNotification;
}

const CollaborantNotificationContent = ({
  extendedNotification,
}: Props): JSX.Element => {
  const createNotificationMessage = useCreateNotificationMessage();
  return (
    <StyledListItem>
      {extendedNotification.state === UserNotificationState.Fresh && (
        <StyledFreshIcon />
      )}
      <StyledListItemText
        primary={createNotificationMessage({
          action: extendedNotification.action,
          actionCreatorDisplayName: extendedNotification.creator.displayName,
        })}
      />
    </StyledListItem>
  );
};

export default memo(CollaborantNotificationContent);
