import { styled } from "@mui/material";

export const GlobalSearchWrapper = styled("div")({
  display: "block",
  width: "100%",
  height: "100%",

  "@media (max-width: 1024px)": {
    marginLeft: "auto",
  },
});

export const StyledContainerWrapper = styled("div")({
  // width: '100%',
  height: "0px",
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledBackdrop = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "expanded" && prop !== "expandableWidth",
})<{
  expanded: boolean | undefined;
}>(({ expanded }) => ({
  display: expanded ? "block" : "none",
  position: "fixed",
  top: 80,
  right: 0,
  bottom: 0,
  left: 0,
  transition: "opacity 225ms ease-in-out",
  zIndex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

export const MobileIconWrapper = styled("div")(() => ({
  color: "#f8f6ee",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
  height: "fit-content",
  width: "fit-content",
  paddingLeft: "6px",
  paddingRight: "4px",
  marginTop: "auto",
  marginBottom: "auto",

  display: "block",
  zIndex: 1300,

  "@media (max-width: 1024px)": {
    display: "block",
  },

  "@media (min-width: 1024px)": {
    display: "none",
  },

  "& *": {
    justifyContent: "center",
  },
  "& svg": {
    width: "26px",
    height: "26px",
    marginTop: "auto",
    marginBottom: "auto",
    cursor: "pointer",
    transition: "0.1s",
    "&:hover": {
      color: "#35d8a5",
    },
    "&:active": {
      color: "#35d8a5",
    },
  },
}));
