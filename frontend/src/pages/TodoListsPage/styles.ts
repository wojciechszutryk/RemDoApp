import { styled } from "@mui/material";

export const StyledTodoListsPageWrapper = styled("main")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  top: 15,
  padding: "0 15px",
  [theme.breakpoints.up("sm")]: {
    padding: "0 50px",
  },
}));

//columnCount approach
// export const StyledTodoListsWrapper = styled("section", {
//   shouldForwardProp: (prop) => prop !== "columns",
// })<{ columns: number }>(({ columns }) => ({
//   // display: "grid",
//   // gridTemplateColumns: `repeat(${columns}, 1fr)`,
//   // gridGap: 20,
//   columnCount: columns,
//   maxWidth: "1000px",
//   margin: "50px auto",
//   "& > div": {
//     marginBottom: 17,
//     "& > div": {
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       "& > div:nth-child(2)": {
//         height: "100%",
//       },
//     },
//   },
// }));

//grid approach
// })<{ columns: number }>(({ columns }) => ({
//   display: "grid",
//   gridTemplateColumns: `repeat(${columns}, 1fr)`,
//   gridGap: 20,
//   maxWidth: "1000px",
//   margin: "50px auto",
//   "& > div > div": {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     "& > div:nth-child(2)": {
//       height: "100%",
//     },
//   },
// }));

//flexbox approach
// export const StyledListsColWrapper = styled("section", {
//   shouldForwardProp: (prop) => prop !== "columns",
// })<{ columns: number }>(({ columns }) => ({
// display: "flex",
// flexDirection: "column",
// flexWrap: "wrap",
// height: "200vh",
//   // display: "grid",
//   // gridTemplateColumns: `repeat(${columns}, 1fr)`,
//   gridGap: 20,
//   maxWidth: "1000px",
//   margin: "50px auto",
//   "& > div": {
//     // marginBottom: 17,
//     width: "50%",
//     "& > div": {
//       height: "100%",
//       display: "flex",
//       flexDirection: "column",
//       "& > div:nth-child(2)": {
//         height: "100%",
//       },
//     },
//   },
// }));

export const StyledListsColWrapper = styled("section")({
  display: "flex",
  maxWidth: "1000px",
  margin: "50px auto",
  gap: 20,
});

export const StyledListsCol = styled("section", {
  shouldForwardProp: (prop) => prop !== "columns",
})<{ columns: number }>(({ columns }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  // width: `calc(${100 / columns}% - 20px)`,
  width: `${100 / columns}%`,
  "& > div > div": {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    "& > div:nth-child(2)": {
      height: "100%",
    },
  },
}));
