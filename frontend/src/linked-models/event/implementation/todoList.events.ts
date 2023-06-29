import { ITodoListWithMembersDto } from "linked-models/todoList/todoList.dto";
import { ITodoListAttached } from "../../todoList/todoList.model";
import { EventName } from "../event.enum";
import { TypedEvent } from "../event.interface";

export const TodoListCreatedEvent = new TypedEvent<ITodoListWithMembersDto>(
  EventName.TodoListCreated
);

export const TodoListUpdatedEvent = new TypedEvent<ITodoListWithMembersDto>(
  EventName.TodoListUpdated
);

export const TodoListDeletedEvent = new TypedEvent<ITodoListAttached>(
  EventName.TodoListDeleted
);

export const TodoListMemberAddedEvent = new TypedEvent<ITodoListAttached>(
  EventName.TodoListMemberAdded
);

export const TodoListMemberRemovedEvent = new TypedEvent<ITodoListAttached>(
  EventName.TodoListMemberRemoved
);
