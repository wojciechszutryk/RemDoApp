import {
  TodoListCollectionName,
  mapTodoListToAttachedTodoList,
  TodoListCollectionType,
} from "dbSchemas/todoList.schema";
import { inject, injectable } from "inversify";
import { ITodoListAttached } from "linked-models/TodoList/TodoList.model";

@injectable()
export class TodoListService {
  constructor(
    @inject(TodoListCollectionName)
    private readonly todoListCollection: TodoListCollectionType
  ) {}

  public async getTodoListsForUser(
    userId: string
  ): Promise<ITodoListAttached | undefined> {
    const foundTodoList = await this.todoListCollection.find({ _id: id });
    if (!foundTodoList) return undefined;

    return mapTodoListToAttachedTodoList(foundTodoList);
  }
}
