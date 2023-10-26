import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { TFunction } from "i18next";
import { EventName } from "linked-models/event/event.enum";

/** creates notification message for collaboration context */
export const createCollaborationNotificationMsg = (
  action: EventName,
  displayName: string,
  t: TFunction<"translation", undefined>
) => {
  let text = "";

  switch (action) {
    case EventName.CollaboartionRequested:
      text = `${displayName} ${t(
        TranslationKeys.UserSendYouCollaborationRequest
      )}`;
      break;
    case EventName.CollaboartionAccepted:
      text = `${displayName} ${t(
        TranslationKeys.UserAcceptedYourCollaborationRequest
      )}`;
      break;
    case EventName.CollaboartionRejected:
      text = `${displayName} ${t(
        TranslationKeys.UserRejectedYourCollaborationRequest
      )}`;
      break;
    case EventName.CollaboartionReOpened:
      text = `${displayName} ${t(
        TranslationKeys.UserSendYouCollaborationSecondRequest
      )}`;
      break;
    case EventName.CollaboartionBlocked:
      text = `${displayName} ${t(
        TranslationKeys.UserSendYouCollaborationSecondRequest
      )}`;
      break;
    default:
      text = `${t(TranslationKeys.NotificationUnknownAction)} ${t(
        TranslationKeys.NotificationByUserPart
      )}${displayName}`;
  }

  return text;
};
