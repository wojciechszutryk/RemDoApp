import { Box } from "@mui/material";
import { TodoListCardLoader } from "atomicComponents/atoms/Loaders/TodoListCardLoader";

const loaderContentHeights = [200, 200, 200, 200, 200, 200];

export const TodoListsLoader = (): JSX.Element => {
  return (
    <Box
      sx={{
        columnCount: { xs: 1, md: 2, xl: 3 },
        maxWidth: 1000,
        margin: "50px auto",
      }}
    >
      {loaderContentHeights.map((height, index) => (
        <TodoListCardLoader contentHeight={height} key={index} />
      ))}
    </Box>
  );
};
