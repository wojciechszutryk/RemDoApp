import {
  mapTodoListToAttachedTodoList,
  TodoListCollectionName,
  TodoListCollectionType,
} from "dbSchemas/todoList.schema";
import { EventService } from "framework/events/event.service";
import {
  TodoListCreatedEvent,
  TodoListDeletedEvent,
  TodoListUpdatedEvent,
} from "framework/events/implementation/todoList.events";
import { inject, injectable } from "inversify";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import {
  ITodoList,
  ITodoListAttached,
  ITodoListWithReadonlyProperties,
} from "linked-models/todoList/todoList.model";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";
import { TaskService } from "services/task/task.service";
import { UserService } from "services/user/user.service";

@injectable()
export class TodoListService {
  constructor(
    @inject(TodoListCollectionName)
    private readonly todoListCollection: TodoListCollectionType,
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(UserService)
    private readonly userService: UserService,
    @inject(EventService)
    private readonly eventService: EventService
  ) {}

  public async getTodoListById(
    todoListId: string
  ): Promise<ITodoListAttached | undefined> {
    const todoList = await this.todoListCollection.findById(todoListId);
    if (!todoList) return undefined;

    return mapTodoListToAttachedTodoList(todoList);
  }

  public async getTodoListsForUser(
    userId: string
  ): Promise<ITodoListAttached[]> {
    const todoLists = await this.todoListCollection.find({
      $or: [
        {
          assignedUsers: userId,
        },
        {
          assignedOwners: userId,
        },
        { creator: userId },
      ],
    });

    const uniqueTodoLists = [...new Set(todoLists)];

    return uniqueTodoLists.map((td) => mapTodoListToAttachedTodoList(td));
  }

  public async getTodoListWithMembersById(
    todoListId: string
  ): Promise<ITodoListWithMembersDto | undefined> {
    const todoList = await this.getTodoListById(todoListId);
    if (!todoList) return undefined;

    const [users, owners] = await Promise.all([
      todoList.assignedUsers
        ? this.userService.getUsersPublicDataByEmails(todoList.assignedUsers)
        : [],
      todoList.assignedOwners
        ? this.userService.getUsersPublicDataByEmails(todoList.assignedOwners)
        : [],
    ]);

    return { ...todoList, assignedUsers: users, assignedOwners: owners };
  }

  public async getTodoListsWithMembersForUser(userId: string): Promise<{
    todoLists: ITodoListWithMembersDto[];
    users: IUserPublicDataDTO[];
  }> {
    const todoLists = await this.getTodoListsForUser(userId);

    const memberEmails = new Set<string>();
    todoLists.forEach((t) => {
      t.assignedOwners?.forEach(memberEmails.add, memberEmails);
      t.assignedUsers?.forEach(memberEmails.add, memberEmails);
    });

    const members = await this.userService.getUsersPublicDataByEmails(
      Array.from(memberEmails)
    );

    const todoListsWithMembers = todoLists.map((td) => ({
      ...td,
      assignedOwners: members.filter((member) =>
        td.assignedOwners?.includes(member.email)
      ),
      assignedUsers: members.filter((member) =>
        td.assignedUsers?.includes(member.email)
      ),
    }));

    return { todoLists: todoListsWithMembers, users: members };
  }

  public async getExtendedTodoListsForUser(
    userId: string
  ): Promise<IExtendedTodoListDto[]> {
    const { todoLists, users } = await this.getTodoListsWithMembersForUser(
      userId
    );
    const todoListIDs = todoLists.map((td) => td.id);

    const tasks = await this.taskService.getTasksByTodoListIDs(todoListIDs);

    return todoLists.map((td) => ({
      ...td,
      tasks: tasks
        .filter((t) => t.todoListId === td.id)
        .map((t) => ({
          ...t,
          creator: users.find((u) => u.id === t.creatorId)!,
        })),
    }));
  }

  public async createTodoList(
    todoListData: ITodoList,
    creator: string
  ): Promise<ITodoListWithMembersDto> {
    const newTodoList: ITodoListWithReadonlyProperties = {
      name: todoListData.name,
      assignedOwners: todoListData.assignedOwners,
      assignedUsers: todoListData.assignedUsers,
      icon: todoListData.icon,
      creator,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTodoList = await this.todoListCollection.create(newTodoList);
    const mappedCreatedTodoList =
      mapTodoListToAttachedTodoList(createdTodoList);

    const [assignedOwners, assignedUsers] = await Promise.all([
      mappedCreatedTodoList.assignedOwners &&
        this.userService.getUsersPublicDataByEmails(
          mappedCreatedTodoList.assignedOwners
        ),
      mappedCreatedTodoList.assignedUsers &&
        this.userService.getUsersPublicDataByEmails(
          mappedCreatedTodoList.assignedUsers
        ),
    ]);

    this.eventService.emit(TodoListCreatedEvent, mappedCreatedTodoList);

    return {
      ...mappedCreatedTodoList,
      assignedOwners: assignedOwners || [],
      assignedUsers: assignedUsers || [],
    };
  }

  /**
   * Warning this service doesn't check if user can update TodoList. It is assumed that proper check is done before using this service
   */
  public async updateTodoList(
    todoListId: string,
    todoListData: Partial<ITodoList>
  ): Promise<ITodoListWithMembersDto> {
    //only valid properties
    const update: Partial<ITodoListAttached> = {
      whenUpdated: new Date(),
    };
    let newUsers = [];
    let newOwners = [];
    if (todoListData.name) update.name = todoListData.name;
    if (todoListData.icon) update.icon = todoListData.icon;

    if (todoListData.assignedOwners) {
      newOwners = await this.userService.getUsersPublicDataByEmails(
        todoListData.assignedOwners
      );
      if (newOwners.length === 0)
        throw new Error(
          `Cannot update todoList: ${todoListId}, because user with passed email does not exist.`
        );
      update.assignedOwners = newOwners.map((u) => u.email);
    }

    if (todoListData.assignedUsers) {
      newUsers = await this.userService.getUsersPublicDataByEmails(
        todoListData.assignedUsers
      );
      if (newUsers.length === 0)
        throw new Error(
          `Cannot update todoList: ${todoListId}, because user with passed email does not exist.`
        );
      update.assignedUsers = newUsers.map((u) => u.email);
    }

    const updatedTodoList = await this.todoListCollection.findByIdAndUpdate(
      todoListId,
      update,
      { new: true }
    );

    if (!updatedTodoList) {
      throw new Error(
        `Cannot update todoList: ${todoListId}, because it does not exist.`
      );
    }

    const mappedUpdatedTodoList =
      mapTodoListToAttachedTodoList(updatedTodoList);

    const [assignedOwners, assignedUsers] = await Promise.all([
      mappedUpdatedTodoList.assignedOwners &&
        this.userService.getUsersByEmails(mappedUpdatedTodoList.assignedOwners),
      mappedUpdatedTodoList.assignedUsers &&
        this.userService.getUsersByEmails(mappedUpdatedTodoList.assignedUsers),
    ]);

    this.eventService.emit(TodoListUpdatedEvent, mappedUpdatedTodoList);

    return {
      ...mappedUpdatedTodoList,
      assignedOwners: assignedOwners || [],
      assignedUsers: assignedUsers || [],
    };
  }

  /**
   * deletes todoList and all it's tasks
   * Warning this service doesn't check if user can delete TodoList. It is assumed that proper check is done before using this service
   */
  public async deleteTodoList(todoListId: string): Promise<ITodoListAttached> {
    const [deletedTodoList] = await Promise.all([
      this.todoListCollection.findByIdAndDelete(todoListId),
      this.taskService.deleteTasksByTodoListId(todoListId),
    ]);

    if (!deletedTodoList)
      throw new Error(
        `Cannot delete todoList: ${todoListId}, because it does not exist.`
      );

    const mappedDeletedTodoList =
      mapTodoListToAttachedTodoList(deletedTodoList);

    this.eventService.emit(TodoListDeletedEvent, mappedDeletedTodoList);

    return mappedDeletedTodoList;
  }
}
