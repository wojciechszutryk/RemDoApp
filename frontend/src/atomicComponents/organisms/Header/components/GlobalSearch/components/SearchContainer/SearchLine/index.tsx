import { Typography } from "@mui/material";
import { MouseEventHandler } from "react";
import { StyledWrapper } from "./styles";

interface SearchLineProps {
  icon: JSX.Element;
  text: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  children?: JSX.Element;
}

const stat = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const SearchLine = ({
  icon,
  text,
  onClick,
  children,
}: SearchLineProps): JSX.Element | null => {
  return (
    <StyledWrapper onClick={onClick} variants={stat}>
      {icon}
      <Typography>{text}</Typography>
      {children}
    </StyledWrapper>
  );
};

export default SearchLine;
