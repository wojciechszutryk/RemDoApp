import { useLayoutEffect } from "react";
import { TodoListThemes } from "./theme.model";

const useSetInitialTheme = () => {
  useLayoutEffect(() => {
    const initialTheme =
      localStorage.getItem("todoListTheme") || TodoListThemes.todoListLight;

    document.body.dataset.theme = initialTheme;

    document.body.dataset.theme = TodoListThemes.todoListLight;
    localStorage.setItem("todoListTheme", TodoListThemes.todoListLight);
  }, []);
};

export default useSetInitialTheme;
