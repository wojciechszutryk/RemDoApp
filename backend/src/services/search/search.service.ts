import {
  TaskCollectionName,
  TaskCollectionType,
  mapTaskToAttachedTask,
} from "dbSchemas/task.schema";
import {
  TodoListCollectionName,
  TodoListCollectionType,
  mapTodoListToAttachedTodoList,
} from "dbSchemas/todoList.schema";
import { UserCollectionName, UserCollectionType } from "dbSchemas/user.schema";
import { mapUserDocumentToUserPublicData } from "helpers/user/mapUserToUserPublicData.helper";
import { inject, injectable } from "inversify";
import { ISimplifiedReminder } from "linked-models/reminder/reminder.model";
import { ITaskAttached } from "linked-models/task/task.model";
import { ITodoListAttached } from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { ReminderService } from "services/reminder/reminder.service";

@injectable()
export class SearchService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType,
    @inject(TodoListCollectionName)
    private readonly todoListCollection: TodoListCollectionType,
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType,
    @inject(ReminderService) private readonly reminderService: ReminderService
  ) {}

  //TODO - convert all the services to $search https://www.mongodb.com/docs/atlas/atlas-search/aggregation-stages/search/#mongodb-pipeline-pipe.-search or vector search
  public async searchForUsers(
    searchPhrase: string,
    limit: number
  ): Promise<IUserPublicDataDTO[]> {
    const foundUsers = await this.userCollection.aggregate([
      {
        $match: {
          $or: [
            { displayName: { $regex: searchPhrase, $options: "i" } },
            { email: { $regex: searchPhrase, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          id: 1,
          displayName: 1,
          avatarUrl: 1,
          email: 1,
          similarityScore: {
            $sum: [
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$displayName",
                      regex: searchPhrase,
                      options: "i",
                    },
                  },
                  10,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$email",
                      regex: searchPhrase,
                      options: "i",
                    },
                  },
                  5,
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { similarityScore: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return foundUsers.map((u) => mapUserDocumentToUserPublicData(u));
  }

  public async searchForTodoLists(
    searchPhrase: string,
    limit: number,
    isReminder: boolean
  ): Promise<ITodoListAttached[]> {
    const foundTodos = await this.todoListCollection.aggregate([
      {
        $match: {
          $and: [
            { name: { $regex: searchPhrase, $options: "i" } },
            { isReminder },
          ],
        },
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          name: 1,
          assignedUsers: 1,
          assignedOwners: 1,
          icon: 1,
          isReminder: 1,
          creatorId: 1,
          whenCreated: 1,
          whenUpdated: 1,
          similarityScore: {
            $cond: [
              {
                $regexMatch: {
                  input: "$name",
                  regex: searchPhrase,
                  options: "i",
                },
              },
              10,
              0,
            ],
          },
        },
      },
      {
        $sort: { similarityScore: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return foundTodos.map((td) => mapTodoListToAttachedTodoList(td));
  }

  public async searchForReminders(
    searchPhrase: string,
    limit: number
  ): Promise<ISimplifiedReminder[]> {
    const foundTodos = await this.searchForTodoLists(searchPhrase, limit, true);

    return await this.reminderService.getRemindersByTodoLists(foundTodos);
  }

  public async searchForTasks(
    searchPhrase: string,
    limit: number
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.aggregate([
      {
        $match: {
          $or: [
            { text: { $regex: searchPhrase, $options: "i" } },
            { description: { $regex: searchPhrase, $options: "i" } },
            { link: { $regex: searchPhrase, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          id: {
            $toString: "$_id",
          },
          text: 1,
          description: 1,
          link: 1,
          startDate: 1,
          finishDate: 1,
          notifyDate: 1,
          completionDate: 1,
          whenCreated: 1,
          whenUpdated: 1,
          todoListId: 1,
          similarityScore: {
            $sum: [
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$text",
                      regex: searchPhrase,
                      options: "i",
                    },
                  },
                  10,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$description",
                      regex: searchPhrase,
                      options: "i",
                    },
                  },
                  5,
                  0,
                ],
              },
              {
                $cond: [
                  {
                    $regexMatch: {
                      input: "$link",
                      regex: searchPhrase,
                      options: "i",
                    },
                  },
                  5,
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: { similarityScore: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }
}
