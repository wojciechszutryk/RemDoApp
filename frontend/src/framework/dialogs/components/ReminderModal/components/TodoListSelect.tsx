import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Select } from "atomicComponents/atoms/Select";
import { Separator } from "atomicComponents/atoms/Separator";
import { TranslationKeys } from "framework/translations/translatedTexts/translationKeys";
import TodoListIcon from "pages/TodoListsPage/components/TodoListIcon";
import { useGetUserTodoListsQuery } from "pages/TodoListsPage/queries/getUserTodoLists.query";
import { memo, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import IconPicker from "../../TodoListModal/components/IconPicker";
import { StyledInlineInputs } from "../../TodoListModal/styles";

const TodoListSelect = (): JSX.Element => {
  const getUserTodoListsWithMembersQuery = useGetUserTodoListsQuery(true);
  const { t } = useTranslation();

  const todoListIdToNameAndMembersMap = useMemo(() => {
    const map = new Map<string, { name: string; members: string }>();
    getUserTodoListsWithMembersQuery.data?.forEach((todoList) => {
      map.set(todoList.id, {
        name: todoList.name,
        members: Array.from(
          new Set([
            ...todoList.assignedOwners.map((o) => o.displayName),
            ...todoList.assignedUsers.map((u) => u.displayName),
          ])
        ).join(", "),
      });
    });
    return map;
  }, [getUserTodoListsWithMembersQuery.data]);

  return (
    <>
      <Separator text={t(TranslationKeys.ScopeChoose)} />
      <Controller
        name={"todoListId"}
        render={({ field: { onChange, value } }) => (
          <StyledInlineInputs style={{ height: "54px" }}>
            {!value || (value === "reminder" && <IconPicker />)}
            <Select
              label={t(TranslationKeys.Reminder)}
              value={value}
              renderValue={(value) =>
                todoListIdToNameAndMembersMap.get(value as string)?.name ||
                t(TranslationKeys.Reminder)
              }
              onChange={(e) => {
                onChange(e.target?.value);
              }}
            >
              <MenuItem value={"reminder"} key={"reminder"}>
                <ListItemIcon>
                  {<EditCalendarIcon color="secondary" />}
                </ListItemIcon>
                <ListItemText
                  secondaryTypographyProps={{
                    style: {
                      whiteSpace: "normal",
                    },
                  }}
                  primary={t(TranslationKeys.Reminder)}
                  secondary={t(TranslationKeys.ReminderInfo)}
                />
              </MenuItem>
              <Separator text={t(TranslationKeys.OrChooseTodoList)} />
              {getUserTodoListsWithMembersQuery.data?.map((todoList) => (
                <MenuItem value={todoList.id} key={todoList.id}>
                  <ListItemIcon>
                    {<TodoListIcon type={todoList.icon} />}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      style: {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                    secondaryTypographyProps={{
                      style: {
                        whiteSpace: "normal",
                      },
                    }}
                    primary={todoList.name}
                    secondary={
                      todoListIdToNameAndMembersMap.get(todoList.id)?.members ||
                      ""
                    }
                  />
                </MenuItem>
              )) ?? []}
            </Select>
          </StyledInlineInputs>
        )}
      />
    </>
  );
};

export default memo(TodoListSelect);
