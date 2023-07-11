import { useMutation } from "@tanstack/react-query";
import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import { useNotifications } from "framework/notificationSocket/useNotifications";
import { IExtendedLoginUserResponseDTO } from "linked-models/user/user.dto";
import {
  URL_LOGIN,
  URL_USERS,
  URL_WITH_TOKEN,
} from "linked-models/user/user.urls";
import { useCurrentUser } from "../useCurrentUser";

export const useLoginUserWithTokenMutation = () => {
  const { setCurrentUser } = useCurrentUser();
  const { setNotifications } = useNotifications();

  const url = FRONTIFY_URL(URL_USERS, `${URL_LOGIN}${URL_WITH_TOKEN}`);

  const loginUserWithToken =
    async (): Promise<IExtendedLoginUserResponseDTO> => {
      return await apiPost<undefined, IExtendedLoginUserResponseDTO>(
        url,
        undefined
      ).then((res) => res.data);
    };

  return useMutation(loginUserWithToken, {
    onSuccess: ({ notifications, ...user }) => {
      setCurrentUser(user);
      setNotifications(notifications);
    },
  });
};
