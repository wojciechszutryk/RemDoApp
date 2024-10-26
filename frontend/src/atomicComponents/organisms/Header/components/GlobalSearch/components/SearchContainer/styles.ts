import { Box, styled } from "@mui/material";

export const StyledSearchContainerWrapper = styled(Box)(() => ({
  zIndex: 1300,
  width: "100%",
}));

export const SearchResultsWrapper = styled(Box)({
  zIndex: 1300,
  overflow: "auto",
  maxHeight: "calc(100vh - 148px)",
  "&::-webkit-scrollbar-track": {
    marginBottom: "2px",
    borderRadius: "0 0 8px 0px",
  },
  "@media (max-width: 1024px)": {
    maxHeight: "unset",
  },
});
