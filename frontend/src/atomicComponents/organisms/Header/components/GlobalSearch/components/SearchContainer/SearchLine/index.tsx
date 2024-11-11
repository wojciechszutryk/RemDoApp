import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import { StyledWrapper } from "./styles";

interface SearchLineProps {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  onDelete?: () => void;
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
  onDelete,
}: SearchLineProps): JSX.Element | null => {
  return (
    <StyledWrapper onClick={onClick} variants={stat}>
      {icon}
      <Typography>{text}</Typography>
      {onDelete && <DeleteIcon onClick={onDelete} />}
    </StyledWrapper>
  );
};

export default SearchLine;
