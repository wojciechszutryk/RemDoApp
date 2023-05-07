import { Popover, styled } from "@mui/material";

export const StyledIconPickerWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  padding: 10,
  borderRadius: 10,
  background: theme.palette.primary.main,
}));

export const StyledPopover = styled(Popover)(({ theme }) => ({
  "& .MuiPopover-paper": {
    borderRadius: 10,
    background: theme.palette.primary.main,
  },
}));
