import { Divider, Typography } from "@mui/material";
import { ControlledCheckbox } from "atomicComponents/molecules/ControlledCheckbox";
import RegisterDeviceForPushButton from "atomicComponents/organisms/Header/components/NotificationsMenu/components/RegisterDeviceForPushButton";
import useCheckPushSubActive from "atomicComponents/organisms/Header/components/NotificationsMenu/hooks/useCheckPushSubActive";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { EventName } from "linked-models/event/event.enum";
import {
  IUserPreferences,
  NotificationPreference,
} from "linked-models/user/user.model";
import { useChangePreferencesMutation } from "pages/UserPage/mutations/useChangePreferences.mutation";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyledForm, StyledSubmitButton } from "./styles";

interface INotificationOptions {
  push: boolean;
  socket: boolean;
  email: boolean;
}

type NotificationsSettingsForm = {
  [EventName.CollaboartionAccepted]: INotificationOptions;
  [EventName.CollaboartionBlocked]: INotificationOptions;
  [EventName.CollaboartionRequested]: INotificationOptions;
  [EventName.CollaboartionReOpened]: INotificationOptions;
  [EventName.CollaboartionRejected]: INotificationOptions;
  [EventName.ReminderCreated]: INotificationOptions;
  [EventName.ReminderDeleted]: INotificationOptions;
  [EventName.ReminderUpdated]: INotificationOptions;
  [EventName.TaskCreated]: INotificationOptions;
  [EventName.TaskDeleted]: INotificationOptions;
  [EventName.TaskUpdated]: INotificationOptions;
  [EventName.TaskRescheduled]: INotificationOptions;
  [EventName.TaskStateChanged]: INotificationOptions;
  [EventName.TodoListCreated]: INotificationOptions;
  [EventName.TodoListDeleted]: INotificationOptions;
  [EventName.TodoListUpdated]: INotificationOptions;
  [EventName.TodoListMemberAdded]: INotificationOptions;
  [EventName.TodoListMemberRemoved]: INotificationOptions;
  [EventName.ScheduleTaskNotification]: INotificationOptions;
  [EventName.ScheduleReminderNotification]: INotificationOptions;
};

const NotificationsSettings = (): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  const changePreferencesMutation = useChangePreferencesMutation();
  const showNoActivePushSubIcon = useCheckPushSubActive();

  const defaultValues = Object.entries(
    currentUser?.preferences.notificationPreferences || {}
  ).reduce((acc, [key, value]) => {
    acc[key as EventName] = {
      push:
        value === NotificationPreference.PUSH_AND_EMAIL ||
        value === NotificationPreference.PUSH_AND_SOCKET ||
        value === NotificationPreference.PUSH ||
        value === NotificationPreference.ALL,
      socket:
        value === NotificationPreference.SOCKET_AND_EMAIL ||
        value === NotificationPreference.PUSH_AND_SOCKET ||
        value === NotificationPreference.SOCKET ||
        value === NotificationPreference.ALL,
      email:
        value === NotificationPreference.SOCKET_AND_EMAIL ||
        value === NotificationPreference.PUSH_AND_EMAIL ||
        value === NotificationPreference.EMAIL ||
        value === NotificationPreference.ALL,
    };
    return acc;
  }, {} as NotificationsSettingsForm);

  const { handleSubmit, control } = useForm<NotificationsSettingsForm>({
    defaultValues,
  });

  const onSubmit = (data: NotificationsSettingsForm) => {
    const updatedPreferences: Partial<IUserPreferences> = {
      notificationPreferences: Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value.push && value.socket && value.email) {
            acc[key as EventName] = NotificationPreference.ALL;
          } else if (value.push && value.socket) {
            acc[key as EventName] = NotificationPreference.PUSH_AND_SOCKET;
          } else if (value.push && value.email) {
            acc[key as EventName] = NotificationPreference.PUSH_AND_EMAIL;
          } else if (value.socket && value.email) {
            acc[key as EventName] = NotificationPreference.SOCKET_AND_EMAIL;
          } else if (value.push) {
            acc[key as EventName] = NotificationPreference.PUSH;
          } else if (value.socket) {
            acc[key as EventName] = NotificationPreference.SOCKET;
          } else if (value.email) {
            acc[key as EventName] = NotificationPreference.EMAIL;
          } else {
            acc[key as EventName] = NotificationPreference.NONE;
          }

          return acc;
        },
        {} as IUserPreferences["notificationPreferences"]
      ),
    };
    changePreferencesMutation.mutate(updatedPreferences);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {showNoActivePushSubIcon && <RegisterDeviceForPushButton />}
      {Object.values(EventName).map((event) => {
        return (
          <div key={event}>
            <Typography>{t(TranslationKeys[event as EventName])}</Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <ControlledCheckbox
                key={`${event}-push`}
                name={`${event}.push`}
                control={control}
                label={t(TranslationKeys.PushNotification)}
              />
              <ControlledCheckbox
                key={`${event}-socket`}
                name={`${event}.socket`}
                control={control}
                label={t(TranslationKeys.SocketNotification)}
              />
              <ControlledCheckbox
                key={`${event}-email`}
                name={`${event}.email`}
                control={control}
                label={t(TranslationKeys.EmailNotification)}
              />
            </div>
            <Divider />
          </div>
        );
      })}

      <StyledSubmitButton type="submit">
        {t(TranslationKeys.Save)}
      </StyledSubmitButton>
    </StyledForm>
  );
};

export default memo(NotificationsSettings);
