import { TodoListThemes } from "./models/theme.model";

export const changeTheme = () => {
  const currentTheme =
    localStorage.getItem("theme") || TodoListThemes.todoListDark;
  const newTheme =
    currentTheme === TodoListThemes.todoListDark
      ? TodoListThemes.todoListLight
      : TodoListThemes.todoListDark;

  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
};
