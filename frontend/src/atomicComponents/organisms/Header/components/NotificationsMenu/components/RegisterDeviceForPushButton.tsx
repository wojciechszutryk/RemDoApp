import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Typography } from "@mui/material";
import { Button } from "atomicComponents/atoms/Button";
import { useCurrentUser } from "framework/authentication/useCurrentUser";
import { usePushSWRegistartion } from "framework/pushServiceWorker/context";
import { useSubscribeForPushMutation } from "framework/pushServiceWorker/mutations/subscribeForPush.mutation";
import { memo } from "react";

const RegisterDeviceForPushButton = (): JSX.Element => {
  const subscribeForPushMutation = useSubscribeForPushMutation();
  const { serviceWorkerRegistration } = usePushSWRegistartion();
  const { currentUser } = useCurrentUser();
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
      <Typography >
        <PriorityHighIcon sx={{ height: 15 }} />
        You have not registered devices for push notifications yet. To stay in
        touch with updates of yours todoLists, reminders, collaborants and
        tasks, please register your device.
      </Typography>
      <Button
        onClick={() =>
          subscribeForPushMutation.mutate({
            serviceWorkerReg: serviceWorkerRegistration,
            userId: currentUser.id,
          })
        }
      >
        Register Device
      </Button>
    </div>
  );
};

export default memo(RegisterDeviceForPushButton);
