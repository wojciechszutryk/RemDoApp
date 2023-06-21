import Card from "@mui/material/Card";
import CardActionsSkeleton from "./TodoListCard/components/LoaderSkeletons/CardActionsSkeleton";
import CardContentSkeleton from "./TodoListCard/components/LoaderSkeletons/CardContentSkeleton";
import CardHeaderSkeleton from "./TodoListCard/components/LoaderSkeletons/CardHeaderSkeleton";

export const TodoListCardLoader = () => {
  return (
    <Card
      sx={{
        m: 2,
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <CardHeaderSkeleton />
      <CardContentSkeleton />
      <CardActionsSkeleton />
    </Card>
  );
};
