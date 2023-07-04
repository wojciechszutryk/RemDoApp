import { memo } from "react";
import CallendarLoader from "./CallendarLoader";

const RemindersPageLoader = (): JSX.Element => {
  return (
    <div>
      <CallendarLoader />
    </div>
  );
};

export default memo(RemindersPageLoader);
