import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import { StyledWrapper } from "./styles";

interface SearchLineProps {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
  onDelete?: () => void;
}

const SearchLine = ({
  icon,
  text,
  onClick,
  onDelete,
}: SearchLineProps): JSX.Element | null => {
  return (
    <StyledWrapper onClick={onClick}>
      {icon}
      <Typography>{text}</Typography>
      {onDelete && <DeleteIcon onClick={onDelete} />}
    </StyledWrapper>
  );
};

export default SearchLine;
