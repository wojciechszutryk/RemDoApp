import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { MenuItem, Select, SelectChangeEvent, Skeleton } from "@mui/material";
import { useGetUserExtendedTodoListsQuery } from "pages/TodoListsPage/queries/getUserExtendedTodoLists.query";
import { useMemo } from "react";
import { LSSearchTodoListIDKey } from "./helpers";

interface Props {
  todoListIds: string[];
  setTodoListIds: (todoListIds: string[]) => void;
}

const TodoListPicker = ({
  todoListIds,
  setTodoListIds,
}: Props): JSX.Element | null => {
  const { isLoading, data } = useGetUserExtendedTodoListsQuery();

  const selectOptions = useMemo(
    () => data?.map((t) => ({ value: t.id, label: t.name })),
    [data]
  );

  const onChange = ({ target: { value } }: SelectChangeEvent<unknown>) => {
    if (typeof value != "string") return;

    const newTodoListIDs = todoListIds.includes(value)
      ? todoListIds.filter((option) => option !== value)
      : [...todoListIds, value];

    setTodoListIds(newTodoListIDs);
    localStorage.setItem(LSSearchTodoListIDKey, JSON.stringify(newTodoListIDs));
  };

  if (isLoading) {
    return (
      <Skeleton
        width={40}
        height={60}
        sx={{ borderRadius: "50%", zIndex: 2 }}
      />
    );
  }

  return (
    <Select
      sx={{
        color: "primary.contrastText",
        border: 0,
        maxWidth: 60,
        zIndex: 1,
        paddingRight: "36px",
      }}
      displayEmpty
      IconComponent={FormatListBulletedIcon}
      renderValue={() => (!todoListIds.length ? "0" : todoListIds.length)}
      value={todoListIds}
      onChange={onChange}
    >
      {selectOptions?.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TodoListPicker;
