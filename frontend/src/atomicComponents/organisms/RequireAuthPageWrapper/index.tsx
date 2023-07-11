import NoPermissionTemplate from "atomicComponents/molecules/NoPermissionTemplate";
import { useCurrentUser } from "framework/authentication/useCurrentUser";

interface Props {
  children: JSX.Element;
}

export const RequireAuthPageWrapper = ({ children }: Props): JSX.Element => {
  const { currentUser } = useCurrentUser();

  if (!!currentUser) {
    return children;
  }

  return <NoPermissionTemplate />;
};
