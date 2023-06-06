import { TypedEvent } from "framework/events/event.interface";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";

export const TodoListCreatedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListCreatedEvent"
);
export const TodoListUpdatedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListUpdatedEvent"
);
export const TodoListDeletedEvent = new TypedEvent<ITodoListAttached>(
  "TodoListDeletedEvent"
);
