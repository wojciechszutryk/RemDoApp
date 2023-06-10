import { ITodoListAttached } from "../../todoList/todoList.model";
import { TypedEvent } from "../event.interface";

export const TodoListCreatedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListCreatedEvent"
);
export const TodoListUpdatedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListUpdatedEvent"
);
export const TodoListDeletedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListDeletedEvent"
);
