import Card from "@mui/material/Card";
import CardActionsSkeleton from "./CardActionsSkeleton";
import CardContentSkeleton from "./CardContentSkeleton";
import CardHeaderSkeleton from "./CardHeaderSkeleton";

interface Props {
  contentHeight?: number;
}

export const TodoListCardLoader = ({ contentHeight }: Props) => {
  return (
    <Card
      sx={{
        m: "0 4px 20px",
        background: "transparent",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={1}
    >
      <CardHeaderSkeleton />
      <CardContentSkeleton height={contentHeight} />
      <CardActionsSkeleton />
    </Card>
  );
};
