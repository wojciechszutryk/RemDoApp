import { styled } from "@mui/material";

export const StyledReccuranceWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 7,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "15px 30px 13px 27px",
  padding: theme.spacing(2),
  position: "relative",
  "&:before, &:after": {
    content: '""',
    position: "absolute",
    top: -15,
    left: 0,
    width: "100%",
    height: 2,
    backgroundColor: theme.palette.background.paper,
  },
  "&:after": {
    top: "auto",
    bottom: -15,
  },
}));

export const StyledReccuranceRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
  flexWrap: "wrap",
  "& > div": {
    width: "48%",
    minWidth: "unset",
  },
  "& > div:nth-of-type(3)": {
    width: "100%",
  },
});

export const StyledIntervalWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "4px 0",
  gap: 20,
  "& > div": {
    height: 30,
    width: 100,
  },
});
