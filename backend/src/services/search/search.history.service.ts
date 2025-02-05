import {
  SearchHistoryCollectionName,
  SearchHistoryCollectionType,
} from "dbSchemas/searchHistory.schema";
import { inject, injectable } from "inversify";
import {
  ISearchHistoryDto,
  ISearchHistoryRespDto,
} from "linked-models/search/search.history.dto";
import { ISearchHistoryAttached } from "linked-models/search/search.history.model";
import { SearchCategory } from "linked-models/search/search.model";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { TaskService } from "services/task/task.service";
import { TodoListService } from "services/todoList/todoList.service";
@injectable()
export class SearchHistoryService {
  constructor(
    @inject(SearchHistoryCollectionName)
    private readonly searchHistoryCollection: SearchHistoryCollectionType,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(TaskService)
    private readonly taskService: TaskService
  ) {}

  private mapTodoAndTaskToSearchHistory(
    searchHistory: ISearchHistoryAttached,
    todoList: ITodoListAttached,
    task?: ITaskAttached,
    isReminder?: boolean
  ): ISearchHistoryRespDto {
    const base = {
      id: searchHistory.id,
      whenCreated: searchHistory.whenCreated,
      searchedTodoListId: todoList.id,
    };
    if (isReminder && task) {
      return {
        ...base,
        searchedTaskId: task.id,
        isReminder,
        displayName: todoList.name,
        entityDate:
          task.notifyDate?.toString() ||
          task.startDate?.toString() ||
          task.finishDate?.toString(),
        category: SearchCategory.Reminder,
      };
    } else if (task) {
      return {
        ...base,
        searchedTaskId: task.id,
        displayName: task.text || "",
        category: SearchCategory.Task,
      };
    }

    return {
      ...base,
      displayName: todoList.name,
      category: SearchCategory.TodoList,
    };
  }

  public async getSearchHistoryForUser(
    userId: string
  ): Promise<ISearchHistoryRespDto[]> {
    const searchHistoryRecords: ISearchHistoryAttached[] =
      await this.searchHistoryCollection.aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $sort: { whenCreated: -1 },
        },
        {
          $addFields: { id: { $toString: "$_id" } },
        },
      ]);

    const { todoListsIDs, taskIDs } = searchHistoryRecords.reduce(
      (acc, { searchedTaskId, searchedTodoListId }) => {
        if (searchedTaskId) {
          acc.taskIDs.add(searchedTaskId);
        }
        if (searchedTodoListId) {
          acc.todoListsIDs.add(searchedTodoListId);
        }
        return acc;
      },
      { todoListsIDs: new Set<string>(), taskIDs: new Set<string>() }
    );

    const [todoLists, tasks] = await Promise.all([
      this.todoListService.getTodoListByIDs(Array.from(todoListsIDs)),
      this.taskService.getTasksByIDs(Array.from(taskIDs)),
    ]);

    const taksMap = tasks.reduce((acc, t) => {
      acc[t.id] = t;
      return acc;
    }, {} as Record<string, ITaskAttached>);

    const todoListsMap = todoLists.reduce((acc, tl) => {
      acc[tl.id] = tl;
      return acc;
    }, {} as Record<string, ITodoListAttached>);

    const resp: ISearchHistoryRespDto[] = [];

    for (const searchHistory of searchHistoryRecords) {
      if (!searchHistory.searchedTodoListId) continue;
      const task = searchHistory.searchedTaskId
        ? taksMap[searchHistory.searchedTaskId]
        : undefined;
      const todoList = todoListsMap[searchHistory.searchedTodoListId];

      if (!todoList) continue;

      resp.push(
        this.mapTodoAndTaskToSearchHistory(
          searchHistory,
          todoList,
          task,
          todoList.isReminder
        )
      );
    }

    return resp;
  }

  public async createSearchHistoryRecord(
    userId: string,
    searchHistoryRecord: ISearchHistoryDto
  ): Promise<ISearchHistoryRespDto | null> {
    const [record, recordCount] = await Promise.all([
      this.searchHistoryCollection.create({
        ...searchHistoryRecord,
        whenCreated: new Date(),
        userId,
      }),
      this.searchHistoryCollection.countDocuments({
        userId,
      }),
    ]);

    if (!record.searchedTodoListId) return null;

    const [todoList, task] = await Promise.all([
      this.todoListService.getTodoListById(record.searchedTodoListId),
      record.searchedTaskId
        ? this.taskService.getTaskById(record.searchedTaskId)
        : Promise.resolve(undefined),
      recordCount > 7
        ? this.searchHistoryCollection.deleteOne(
            {
              userId,
            },
            { sort: { whenCreated: 1 } }
          )
        : Promise.resolve(null),
    ]);

    if (!todoList) return null;

    return this.mapTodoAndTaskToSearchHistory(
      record as ISearchHistoryAttached,
      todoList,
      task,
      record.isReminder
    );
  }
}
