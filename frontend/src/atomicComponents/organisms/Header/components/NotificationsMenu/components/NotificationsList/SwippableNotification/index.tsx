import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { useTheme } from "@mui/material";
import SwippableItem from "atomicComponents/molecules/SwippableItem";
import { useDeleteUserNotificationsMutation } from "framework/notifications/mutations/deleteUserNotification.mutation";
import { useEditUserNotificationsMutation } from "framework/notifications/mutations/editUserNotification.mutation";
import { EventSubject } from "linked-models/event/event.enum";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { memo } from "react";
import { IExtendedNotification } from "..";
import CollaborantNotificationContent from "./CollaborantNotificationContent";
import TodoListNotificationContent from "./TodoListNotificationContent";

interface Props {
  extendedNotification: IExtendedNotification;
}

const SwippableNotification = ({
  extendedNotification,
}: Props): JSX.Element => {
  const isArchived =
    extendedNotification.state === UserNotificationState.Archived;
  const theme = useTheme();
  const editUserNotificationMutation = useEditUserNotificationsMutation();
  const deleteUserNotificationsMutation = useDeleteUserNotificationsMutation();

  return (
    <SwippableItem
      key={extendedNotification.userNotificationId}
      defaultColor={
        isArchived ? theme.palette.background.paper : theme.palette.info.main
      }
      rightShift={{
        color: isArchived
          ? theme.palette.info.main
          : theme.palette.background.paper,
        Icon: isArchived ? <UnarchiveIcon /> : <ArchiveIcon />,
        action: () =>
          editUserNotificationMutation.mutate([
            {
              editedUserNotificationId: extendedNotification.userNotificationId,
              state: isArchived
                ? UserNotificationState.Read
                : UserNotificationState.Archived,
            },
          ]),
      }}
      leftShift={{
        color: theme.palette.warning.main,
        Icon: <DeleteIcon />,
        action: () =>
          deleteUserNotificationsMutation.mutate([
            extendedNotification.userNotificationId,
          ]),
      }}
    >
      <>
        {extendedNotification.actionSubject === EventSubject.Collaboration ? (
          <CollaborantNotificationContent
            extendedNotification={extendedNotification}
          />
        ) : (
          <TodoListNotificationContent
            extendedNotification={extendedNotification}
          />
        )}
      </>
    </SwippableItem>
  );
};

export default memo(SwippableNotification);
