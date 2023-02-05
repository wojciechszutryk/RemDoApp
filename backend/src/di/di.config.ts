import { Container } from "inversify";
import { registerTaskBindings } from "./register.task.bindings";
import { registerTodoListBindings } from "./register.todoList.bindings";
import { registerUserBindings } from "./register.user.bindings";

export const registerBindings = (container: Container) => {
  registerUserBindings(container);
  registerTodoListBindings(container);
  registerTaskBindings(container);
};
