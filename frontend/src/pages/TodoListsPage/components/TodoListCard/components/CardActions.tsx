import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import { CardActions as MUICardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Button } from "atomicComponents/atoms/Button";
import { memo } from "react";
import { StyledExpandMore } from "../styles";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardActions = ({ expanded, setExpanded }: Props): JSX.Element => {
  return (
    <MUICardActions disableSpacing>
      <Button>Dodaj task</Button>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
      <StyledExpandMore
        expand={expanded}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </StyledExpandMore>
    </MUICardActions>
  );
};

export default memo(CardActions);
