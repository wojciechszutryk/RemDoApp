import { Grid, Skeleton } from "@mui/material";

export const TodoListsLoader = (): JSX.Element => {
  return (
    <Grid container spacing={5}>
      {Array.from(
        { length: 6 },
        () => Math.floor(Math.random() * (220 - 180 + 1)) + 180
      ).map((height, index) => (
        <Grid key={index} item xs={12} md={6} lg={4}>
          <Skeleton height={`${height}px`} />
        </Grid>
      ))}
    </Grid>
  );
};
