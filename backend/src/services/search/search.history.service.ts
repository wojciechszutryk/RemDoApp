import {
  ISearchHistoryDocument,
  SearchHistoryCollectionName,
  SearchHistoryCollectionType,
} from "dbSchemas/searchHistory.schema";
import { inject, injectable } from "inversify";
import { ISearchHistoryDto, ISearchHistoryRespDto } from "linked-models/search/search.history.dto";
import { ISearchHistory, ISearchHistoryAttached } from "linked-models/search/search.history.model";
import { SearchCategory } from "linked-models/search/search.model";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { FilterQuery } from "mongoose";
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
        {
          $limit: 7,
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
      const task = searchedTaskId && taksMap[searchedTaskId];
      const todoList = todoListsMap[searchedTodoListId];
      if (isReminder && searchedTaskId && task) {
        resp.push({
          id,
          searchedTodoListId: searchedTodoListId,
          searchedTaskId: task.id,
          isReminder,
          displayName: todoList.name,
          category: SearchCategory.Reminder,
        });
      } else if (searchedTaskId && task) {
        resp.push({
          id,
          searchedTodoListId: todoList.id,
          searchedTaskId,
          displayName: task.text || "",
          category: SearchCategory.Task,
        });
      } else {
        resp.push({
          id,
          searchedTodoListId: todoList.id,
          displayName: todoList.name,
          category: SearchCategory.TodoList,
        });
      }
    }

    return resp;
  }

  public async createSearchHistoryRecord(
    userId: string,
    searchHistoryRecord: ISearchHistoryDto
  ): Promise<ISearchHistoryRespDto> {
    const record = await this.searchHistoryCollection.create({
      ...searchHistoryRecord,
      userId,
    });

    if(record.isReminder || !record.searchedTaskId){
      await this.todoListService.getTodoListById(record.searchedTodoListId)
    }

    return map;
  }

  public async deleteSearchHistoryForUser(userId: string): Promise<void> {
    await this.searchHistoryCollection.deleteMany({
      userId,
    });
  }

  public async deleteSearchHistoryRecordById(
    userId: string,
    recordId: string
  ): Promise<void> {
    await this.searchHistoryCollection.deleteOne({
      userId,
      _id: recordId,
    });
  }

  public async deleteSearchHistoryRecords(
    filter: FilterQuery<ISearchHistoryDocument>
  ): Promise<void> {
    await this.searchHistoryCollection.deleteMany(filter);
  }
}
