import NoPermissionTemplate from "atomicComponents/molecules/NoPermissionTemplate";
import { useCurrentUser } from "framework/authentication/useCurrentUser";

interface Props {
  children: JSX.Element;
}

export const ProtectedPageWrapper = ({ children }: Props): JSX.Element => {
  const { currentUser } = useCurrentUser();

  if (!!currentUser) {
    //TODO: check if user has access to this page
    return children;
  }

  return <NoPermissionTemplate />;
};
