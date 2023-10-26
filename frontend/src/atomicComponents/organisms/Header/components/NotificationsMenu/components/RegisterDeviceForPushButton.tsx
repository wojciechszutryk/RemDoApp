import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { usePushSWRegistartion } from "framework/pushServiceWorker/context";
import { useSubscribeForPushMutation } from "framework/pushServiceWorker/mutations/subscribeForPush.mutation";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const RegisterDeviceForPushButton = (): JSX.Element => {
  const subscribeForPushMutation = useSubscribeForPushMutation();
  const { serviceWorkerRegistration } = usePushSWRegistartion();
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();
  if (!serviceWorkerRegistration || !currentUser) return <></>;

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10,
        padding: 20,
      }}
    >
      <Typography>
        <PriorityHighIcon sx={{ height: 15 }} />
        {t(TranslationKeys.RegisterPushSubscriptionDescription)}
      </Typography>
      <Button
        onClick={() => {
          subscribeForPushMutation.mutate({
            serviceWorkerReg: serviceWorkerRegistration,
            userId: currentUser.id,
          });
        }}
      >
        {t(TranslationKeys.RegisterPushSubscription)}
      </Button>
    </div>
  );
};

export default memo(RegisterDeviceForPushButton);
