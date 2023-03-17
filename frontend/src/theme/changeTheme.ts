import { TodoListThemes } from "./theme.model";

export const changeTheme = ({
  newTheme,
  onChangeTheme,
}: {
  newTheme: TodoListThemes;
  onChangeTheme: (theme: TodoListThemes) => void;
}) => {
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  onChangeTheme(newTheme);
};
