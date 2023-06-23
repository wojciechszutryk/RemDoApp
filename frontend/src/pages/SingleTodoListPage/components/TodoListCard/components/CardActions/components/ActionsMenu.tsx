import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, ListItemIcon, ListItemText, Menu } from "@mui/material";
import { memo, useState } from "react";
import { StyledMenuItem } from "../styles";

interface Props {
  interactions: {
    onClick: () => void;
    label: string;
    icon: JSX.Element;
  }[];
}

const ActionsMenu = ({ interactions }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="expand-more"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {interactions.map(({ onClick, label, icon }) => (
          <StyledMenuItem key={label} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </StyledMenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(ActionsMenu);
