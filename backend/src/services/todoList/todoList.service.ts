import {
  ITodoListDocument,
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
import { IExtendedTaskDto } from "linked-models/task/task.dto";
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
import { IUserAttached } from "linked-models/user/user.model";
import { FilterQuery } from "mongoose";
import { OrderService } from "services/order/order.service";
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
    @inject(OrderService) private readonly orderService: OrderService,
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

  public async getTodoListByIDs(
    todoListIDs: string[]
  ): Promise<ITodoListAttached[]> {
    const todoList = await this.todoListCollection.find({
      _id: { $in: todoListIDs },
    });

    return todoList.map((td) => mapTodoListToAttachedTodoList(td));
  }

  public async getTodoListsForUser(
    userId: string,
    options?: Partial<FilterQuery<ITodoListDocument>>
  ): Promise<ITodoListAttached[]> {
    const filter: FilterQuery<ITodoListDocument> = {
      $or: [
        { assignedUsers: { $in: [userId] } },
        { assignedOwners: { $in: [userId] } },
        { creatorId: userId },
      ],
    };

    if (options) Object.assign(filter, options);

    const todoLists = await this.todoListCollection.find(filter);

    const uniqueTodoLists = [...new Set(todoLists)];

    return uniqueTodoLists.map((td) => mapTodoListToAttachedTodoList(td));
  }

  public async addUsersPublicData<T extends Partial<ITodoList> & { creatorId: string }>(
    obj: T
  ) {
    const [users, owners, creator] = await Promise.all([
      obj.assignedUsers
        ? this.userService.getUsersPublicDataByIDs(obj.assignedUsers)
        : [],
      obj.assignedOwners
        ? this.userService.getUsersPublicDataByIDs(obj.assignedOwners)
        : [],
      obj.creatorId
        ? this.userService.getUserPublicData(obj.creatorId)
        : undefined,
    ]);

    if (!creator)
      throw new Error(
        `Creator of todoList does not exist. Cannot get todoList with members.`
      );

    return {
      ...obj,
      assignedUsers: users,
      assignedOwners: owners,
      creator,
    };
  }

  public async getTodoListWithMembersById(
    todoListId: string
  ): Promise<ITodoListWithMembersDto | undefined> {
    const todoList = await this.getTodoListById(todoListId);
    if (!todoList) return undefined;

    return await this.addUsersPublicData(todoList);
  }

  public async getTodoListMemberIDs(todoListId: string): Promise<string[]> {
    const todoList = await this.getTodoListWithMembersById(todoListId);

    const todoListMembersIDs = new Set<string>();
    todoList?.assignedOwners.forEach((u) => todoListMembersIDs.add(u.id));
    todoList?.assignedUsers.forEach((u) => todoListMembersIDs.add(u.id));

    return Array.from(todoListMembersIDs);
  }

  public async getTodoListWithAttachedMembers(todoListId: string): Promise<{
    todoListMembers: IUserAttached[];
    todoList?: ITodoListAttached;
  }> {
    const todoList = await this.getTodoListById(todoListId);

    if (!todoList)
      return {
        todoList: undefined,
        todoListMembers: [],
      };

    const todoListMembersIDs = new Set<string>();
    todoList?.assignedOwners?.forEach((u) => todoListMembersIDs.add(u));
    todoList?.assignedUsers?.forEach((u) => todoListMembersIDs.add(u));

    const todoListMembers = await this.userService.getUsersByIDs(
      Array.from(todoListMembersIDs)
    );

    return { todoList, todoListMembers };
  }

  public async getTodoListsWithMembersForUser(
    userId: string,
    options?: Partial<FilterQuery<ITodoListDocument>>
  ): Promise<{
    todoLists: ITodoListWithMembersDto[];
    users: IUserPublicDataDTO[];
  }> {
    const todoLists = await this.getTodoListsForUser(userId, options);

    const memberIDs = new Set<string>(todoLists.map((t) => t.creatorId));
    todoLists.forEach((t) => {
      t.assignedOwners?.forEach(memberIDs.add, memberIDs);
      t.assignedUsers?.forEach(memberIDs.add, memberIDs);
    });

    const members = await this.userService.getUsersPublicDataByIDs(
      Array.from(memberIDs)
    );

    const todoListsWithMembers = todoLists.map((td) => ({
      ...td,
      creator: members.find((member) => member.id === td.creatorId)!,
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
    userId: string,
    options?: Partial<FilterQuery<ITodoListDocument>>
  ): Promise<IExtendedTodoListDto[]> {
    const [{ todoLists, users }, orders] = await Promise.all([
      this.getTodoListsWithMembersForUser(userId, options),
      this.orderService.getAllOrdersForUser(userId),
    ]);

    const todoListsOrdersMap = new Map<string, number>();
    const tasksOrderMap = new Map<string, number>();
    orders.forEach((o) => {
      if (!o.value) return;
      if (o.todoListId) todoListsOrdersMap.set(o.todoListId, o.value);
      if (o.taskId) tasksOrderMap.set(o.taskId, o.value);
    });

    const userIdToUserMap = new Map<string, IUserPublicDataDTO>(
      users.map((u) => [u.id, u])
    );

    const todoListIDs = todoLists.map((td) => td.id);
    const tasks = await this.taskService.getTasksByTodoListIDs(
      todoListIDs,
      undefined,
      undefined,
      userId
    );

    const todoListIdToTasksMap = new Map<string, IExtendedTaskDto[]>();
    tasks.forEach((t) => {
      const list = todoListIdToTasksMap.get(t.todoListId);
      const extendedTask = {
        ...t,
        order: tasksOrderMap.get(t.id),
        creator: userIdToUserMap.get(t.creatorId),
      };
      if (list) list.push(extendedTask);
      else todoListIdToTasksMap.set(t.todoListId, [extendedTask]);
    });

    return todoLists
      .map((td) => ({
        ...td,
        order: todoListsOrdersMap.get(td.id),
        tasks:
          todoListIdToTasksMap.get(td.id)?.sort((a, b) => {
            if (a.order && b.order) return a.order - b.order;
            return 0;
          }) || [],
      }))
      .sort((a, b) => {
        if (a.order && b.order) return a.order - b.order;
        return 0;
      });
  }

  public async createTodoList(
    todoListData: ITodoList,
    creatorId: string,
    isReminder = false,
    generateEvent = true
  ): Promise<ITodoListWithMembersDto> {
    const newTodoList: ITodoListWithReadonlyProperties = {
      name: todoListData.name,
      assignedOwners: todoListData.assignedOwners,
      assignedUsers: todoListData.assignedUsers,
      icon: todoListData.icon,
      creatorId: creatorId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
      isReminder,
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

    const todoListWithMembers = await this.getTodoListWithMembersById(
      createdTodoList._id
    );

    if (!todoListWithMembers) throw new Error("Error while creating todoList.");

    if (generateEvent)
      this.eventService.emit(
        TodoListCreatedEvent,
        creatorId,
        todoListWithMembers
      );

    return todoListWithMembers;
  }

  /**
   * Warning this service doesn't check if user can update TodoList. It is assumed that proper check is done before using this service
   */
  public async updateTodoList(
    todoListId: string,
    todoListData: Partial<ITodoList>,
    updaterId: string,
    generateEvent = true
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

    const todoListWithMembers = await this.getTodoListWithMembersById(
      updatedTodoList._id
    );

    if (!todoListWithMembers) {
      throw new Error(
        `Cannot update todoList: ${todoListId}, because it does not exist.`
      );
    }

    if (generateEvent)
      this.eventService.emit(
        TodoListUpdatedEvent,
        updaterId,
        todoListWithMembers
      );

    return todoListWithMembers;
  }

  /**
   * deletes todoList and all it's tasks
   * Warning this service doesn't check if user can delete TodoList. It is assumed that proper check is done before using this service
   */
  public async deleteTodoList(
    todoListId: string,
    deleterId: string,
    generateEvent = true
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

    if (generateEvent)
      this.eventService.emit(
        TodoListDeletedEvent,
        deleterId,
        mappedDeletedTodoList
      );

    return mappedDeletedTodoList;
  }
}
