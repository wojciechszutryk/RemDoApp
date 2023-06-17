import {
  mapTodoListToAttachedTodoList,
  TodoListCollectionName,
  TodoListCollectionType,
} from "dbSchemas/todoList.schema";
import { EventService } from "framework/events/event.service";
import { inject, injectable } from "inversify";
import {
  TodoListCreatedEvent,
  TodoListDeletedEvent,
  TodoListUpdatedEvent,
} from "linked-models/event/implementation/todoList.events";
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
        { assignedUsers: { $in: [userId] } },
        { assignedOwners: { $in: [userId] } },
        { creatorId: userId },
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
        ? this.userService.getUsersPublicDataByIDs(todoList.assignedUsers)
        : [],
      todoList.assignedOwners
        ? this.userService.getUsersPublicDataByIDs(todoList.assignedOwners)
        : [],
    ]);

    return { ...todoList, assignedUsers: users, assignedOwners: owners };
  }

  public async getTodoListMemberIDs(todoListId: string): Promise<string[]> {
    const todoList = await this.getTodoListWithMembersById(todoListId);

    const todoListMembersIDs = new Set<string>();
    todoList?.assignedOwners.forEach((u) => todoListMembersIDs.add(u.id));
    todoList?.assignedUsers.forEach((u) => todoListMembersIDs.add(u.id));

    return Array.from(todoListMembersIDs);
  }

  public async getTodoListsWithMembersForUser(userId: string): Promise<{
    todoLists: ITodoListWithMembersDto[];
    users: IUserPublicDataDTO[];
  }> {
    const todoLists = await this.getTodoListsForUser(userId);

    const memberIDs = new Set<string>();
    todoLists.forEach((t) => {
      t.assignedOwners?.forEach(memberIDs.add, memberIDs);
      t.assignedUsers?.forEach(memberIDs.add, memberIDs);
    });

    const members = await this.userService.getUsersPublicDataByIDs(
      Array.from(memberIDs)
    );

    const todoListsWithMembers = todoLists.map((td) => ({
      ...td,
      assignedOwners: members.filter((member) =>
        td.assignedOwners?.includes(member.id)
      ),
      assignedUsers: members.filter((member) =>
        td.assignedUsers?.includes(member.id)
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
    creatorId: string
  ): Promise<ITodoListWithMembersDto> {
    const newTodoList: ITodoListWithReadonlyProperties = {
      name: todoListData.name,
      assignedOwners: todoListData.assignedOwners,
      assignedUsers: todoListData.assignedUsers,
      icon: todoListData.icon,
      creatorId: creatorId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    if (
      todoListData.assignedOwners &&
      todoListData.assignedOwners?.length > 0
    ) {
      const owners = await this.userService.getUsersByEmails(
        todoListData.assignedOwners
      );
      if (owners.length === 0)
        throw new Error(
          `One of the owners does not exist. Cannot create todoList.`
        );
      newTodoList.assignedOwners = owners.map((u) => u.id);
    }

    if (todoListData.assignedUsers && todoListData.assignedUsers?.length > 0) {
      const users = await this.userService.getUsersByEmails(
        todoListData.assignedUsers
      );
      if (users.length === 0)
        throw new Error(
          `One of the users does not exist. Cannot create todoList.`
        );
      newTodoList.assignedUsers = users.map((u) => u.id);
    }

    const createdTodoList = await this.todoListCollection.create(newTodoList);
    const mappedCreatedTodoList =
      mapTodoListToAttachedTodoList(createdTodoList);

    const [assignedOwners, assignedUsers] = await Promise.all([
      mappedCreatedTodoList.assignedOwners &&
        this.userService.getUsersPublicDataByIDs(
          mappedCreatedTodoList.assignedOwners
        ),
      mappedCreatedTodoList.assignedUsers &&
        this.userService.getUsersPublicDataByIDs(
          mappedCreatedTodoList.assignedUsers
        ),
    ]);

    this.eventService.emit(
      TodoListCreatedEvent,
      creatorId,
      mappedCreatedTodoList
    );

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
    todoListData: Partial<ITodoList>,
    updaterId: string
  ): Promise<ITodoListWithMembersDto> {
    //only valid properties
    const update: Partial<ITodoListAttached> = {
      whenUpdated: new Date(),
    };
    let newUsers = [];
    let newOwners = [];
    if (todoListData.name) update.name = todoListData.name;
    if (todoListData.icon) update.icon = todoListData.icon;

    if (
      todoListData.assignedOwners &&
      todoListData.assignedOwners?.length > 0
    ) {
      newOwners = await this.userService.getUsersByEmails(
        todoListData.assignedOwners
      );
      if (newOwners.length === 0)
        throw new Error(
          `Cannot update todoList: ${todoListId}, because user with passed email does not exist.`
        );
      update.assignedOwners = newOwners.map((u) => u.id);
    }

    if (todoListData.assignedUsers && todoListData.assignedUsers?.length > 0) {
      newUsers = await this.userService.getUsersByEmails(
        todoListData.assignedUsers
      );
      if (newUsers.length === 0)
        throw new Error(
          `Cannot update todoList: ${todoListId}, because user with passed email does not exist.`
        );
      update.assignedUsers = newUsers.map((u) => u.id);
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

    this.eventService.emit(
      TodoListUpdatedEvent,
      updaterId,
      mappedUpdatedTodoList
    );

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
  public async deleteTodoList(
    todoListId: string,
    deleterId: string
  ): Promise<ITodoListAttached> {
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

    this.eventService.emit(
      TodoListDeletedEvent,
      deleterId,
      mappedDeletedTodoList
    );

    return mappedDeletedTodoList;
  }
}
