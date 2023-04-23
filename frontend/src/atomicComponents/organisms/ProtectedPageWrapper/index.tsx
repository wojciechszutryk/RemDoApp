import NoPermissionTemplate from "atomicComponents/molecules/NoPermissionTemplate";

interface Props {
  children: JSX.Element;
}

export const ProtectedPageWrapper = ({ children }: Props): JSX.Element => {
  if (true) {
    //TODO: check if user has access to this page
    return children;
  }

  return <NoPermissionTemplate />;
};
