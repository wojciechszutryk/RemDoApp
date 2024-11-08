import { Container } from "inversify";
import { registerCollaborationBindings } from "./register.collaboartion.bindings";
import { registerNotificationBindings } from "./register.notification.bindings";
import { registerOrderBindings } from "./register.order.bindings";
import { registerOtherBindings } from "./register.other.bindings";
import { registerReminderBindings } from "./register.reminder.bindings";
import { registerSearchHistoryBindings } from "./register.search.bindings";
import { registerTaskBindings } from "./register.task.bindings";
import { registerTodoListBindings } from "./register.todoList.bindings";
import { registerUserBindings } from "./register.user.bindings";

export const registerBindings = (container: Container) => {
  registerUserBindings(container);
  registerNotificationBindings(container);
  registerCollaborationBindings(container);
  registerTodoListBindings(container);
  registerTaskBindings(container);
  registerReminderBindings(container);
  registerSearchHistoryBindings(container);
  registerOtherBindings(container);
  registerOrderBindings(container);
};
