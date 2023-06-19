import { Box, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";

const IconSkeleton = () => <Skeleton animation="wave" height={40} width={27} />;

export const TodoListCardLoader = () => {
  return (
    <Card sx={{ m: 2, borderRadius: "20px" }} elevation={0}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        action={<IconSkeleton />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton animation="wave" height={60} width="150px" />
        <Box sx={{ display: "flex", gap: 1 }}>
          {[1, 2, 3].map((_, index) => (
            <IconSkeleton key={index} />
          ))}
        </Box>
      </CardActions>
    </Card>
  );
};
