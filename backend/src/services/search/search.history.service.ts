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
    searchHistoryRecordId: string,
    todoList: ITodoListAttached,
    task?: ITaskAttached,
    isReminder?: boolean
  ): ISearchHistoryRespDto {
    if (isReminder && task) {
      return {
        id: searchHistoryRecordId,
        searchedTodoListId: todoList.id,
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
        id: searchHistoryRecordId,
        searchedTodoListId: todoList.id,
        searchedTaskId: task.id,
        displayName: task.text || "",
        category: SearchCategory.Task,
      };
    }

    return {
      id: searchHistoryRecordId,
      searchedTodoListId: todoList.id,
      displayName: todoList.name,
      category: SearchCategory.TodoList,
    };
  }

  public async getSearchHistoryForUser(
    userId: string
  ): Promise<ISearchHistoryRespDto[]> {
    const searchHistoryRecords: ISearchHistoryAttached[] =
      //todo create a job periodically deleting older then most recent 7 history entries
      await this.searchHistoryCollection.aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $sort: { whenCreated: -1 },
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

    for (const {
      id,
      isReminder,
      searchedTaskId,
      searchedTodoListId,
    } of searchHistoryRecords) {
      if (!searchedTodoListId) continue;
      const task = searchedTaskId ? taksMap[searchedTaskId] : undefined;
      const todoList = todoListsMap[searchedTodoListId];

      if (!todoList) continue;

      resp.push(
        this.mapTodoAndTaskToSearchHistory(id, todoList, task, isReminder)
      );
    }

    return resp;
  }

  public async createSearchHistoryRecord(
    userId: string,
    searchHistoryRecord: ISearchHistoryDto
  ): Promise<ISearchHistoryRespDto | null> {
    const record = await this.searchHistoryCollection.create({
      ...searchHistoryRecord,
      userId,
    });

    if (!record.searchedTodoListId) return null;

    const [todoList, task] = await Promise.all([
      this.todoListService.getTodoListById(record.searchedTodoListId),
      record.searchedTaskId
        ? this.taskService.getTaskById(record.searchedTaskId)
        : Promise.resolve(undefined),
      this.searchHistoryCollection.deleteOne(
        {
          userId,
        },
        { sort: { whenCreated: 1 } }
      ),
    ]);

    if (!todoList) return null;

    return this.mapTodoAndTaskToSearchHistory(
      record.id,
      todoList,
      task,
      record.isReminder
    );
  }
}
