import React, { memo } from "react";

interface Props {
  children: React.ReactNode;
  activeIndex: number | null;
  tabIndex: number;
}

const TabWrapper = ({
  children,
  activeIndex,
  tabIndex,
}: Props): JSX.Element => {
  const isActive = activeIndex === tabIndex;
  return (
    <div role="tabpanel" hidden={!isActive} id={`tabpanel-${tabIndex}`} style={{
      animation: "fadeIn 0.3s linear",
    }}>
      {children}
    </div>
  );
};

export default memo(TabWrapper);
