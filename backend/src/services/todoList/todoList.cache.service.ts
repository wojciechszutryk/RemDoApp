import { ITodoListDocument } from "dbSchemas/todoList.schema";
import { CacheService } from "framework/cache/cache.service";
import { inject, injectable } from "inversify";
import { IExtendedTodoListDto } from "linked-models/todoList/todoList.dto";
import { FilterQuery } from "mongoose";
import { TodoListService } from "./todoList.service";

@injectable()
export class TodoListCacheService {
  constructor(
    @inject(CacheService) private readonly cacheService: CacheService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService
  ) {}

  /** Returns cached ExtendedTodoLists data for user
   * - reason: data might be large, it changes rarely
   * - cache time: 10 minutes
   * - invalidation: after every task/todoList modification
   */
  public async getCachedExtendedTodoListsForUser(
    userId: string,
    options?: Partial<FilterQuery<ITodoListDocument>>
  ): Promise<IExtendedTodoListDto[]> {
    return this.cacheService.wrap(
      this.getExtendedTodoListsForUserCacheKey(userId),
      () => this.todoListService.getExtendedTodoListsForUser(userId, options),
      86400
    );
  }

  private getExtendedTodoListsForUserCacheKey(userId: string) {
    return `extended_todoLists_for_user_${userId}`;
  }

  public invalidateExtendedTodoListCacheForUser(userId: string) {
    this.cacheService.del(this.getExtendedTodoListsForUserCacheKey(userId));
  }

  public async invalidateExtendedTodoListCacheByUserIDs(userIDs: string[]) {
    userIDs.forEach((userId) => {
      this.invalidateExtendedTodoListCacheForUser(userId);
    });
  }
}
