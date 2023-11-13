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
        value === NotificationPreference.PUSH ||
        value === NotificationPreference.ALL,
      socket:
        value === NotificationPreference.SOCKET ||
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
          acc[key as EventName] = value.push
            ? value.socket
              ? NotificationPreference.ALL
              : NotificationPreference.PUSH
            : value.socket
            ? NotificationPreference.SOCKET
            : NotificationPreference.NONE;
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
            <div style={{ display: "flex" }}>
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
