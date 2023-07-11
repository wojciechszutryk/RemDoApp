import { Typography, TypographyProps } from "@mui/material";

export const Bold = (
  props: TypographyProps,
  children: JSX.Element | JSX.Element[]
): JSX.Element => {
  return (
    <Typography variant="body1" style={{ fontWeight: "bold" }} {...props}>
      {children}
    </Typography>
  );
};
