import { IconButton } from "@mui/material";
import { memo } from "react";

interface Props {
  interactions: {
    onClick: () => void;
    label: string;
    icon: JSX.Element;
  }[];
}

const ActionsButtons = ({ interactions }: Props): JSX.Element => {
  return (
    <>
      {interactions.map(({ onClick, label, icon }) => (
        <IconButton key={label} aria-label={label} onClick={onClick}>
          {icon}
        </IconButton>
      ))}
    </>
  );
};

export default memo(ActionsButtons);
