import {
  mapTodoListToAttachedTodoList,
  TodoListCollectionName,
  TodoListCollectionType,
} from "dbSchemas/todoList.schema";
import { getTemUser, TEMP_USER_ID } from "framework/auth/tempUser.helper";
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
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
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
    @inject(ScheduleNotificationService)
    private readonly scheduleNotificationService: ScheduleNotificationService,
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

    const [users, owners, creator] = await Promise.all([
      todoList.assignedUsers
        ? this.userService.getUsersPublicDataByIDs(todoList.assignedUsers)
        : [],
      todoList.assignedOwners
        ? this.userService.getUsersPublicDataByIDs(todoList.assignedOwners)
        : [],
      this.userService.getUserPublicData(todoList.creatorId),
    ]);

    if (!creator) return undefined;

    return {
      ...todoList,
      assignedUsers: users,
      assignedOwners: owners,
      creator,
    };
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

  public async getTodoListsWithMembersForUser(userId: string): Promise<{
    todoLists: ITodoListWithMembersDto[];
    users: IUserPublicDataDTO[];
  }> {
    const todoLists = await this.getTodoListsForUser(userId);

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

  public async getExtendedTodoList(
    todoListId: string,
    userId: string
  ): Promise<IExtendedTodoListDto> {
    const [todoListWithMembers, tasks] = await Promise.all([
      this.getTodoListWithMembersById(todoListId),
      this.taskService.getTasksByTodoListIDs(
        [todoListId],
        undefined,
        undefined,
        userId
      ),
    ]);

    if (!todoListWithMembers) throw new Error("TodoList does not exist.");

    const membersMap = new Map<string, IUserPublicDataDTO>();

    const todoListMembers = [
      /** exlamation mark - service always return array  */
      ...todoListWithMembers!.assignedOwners,
      ...todoListWithMembers!.assignedUsers,
    ];

    todoListMembers.forEach((u) => membersMap.set(u.id, u));

    const mappedTasks: IExtendedTaskDto[] = [];
    tasks.forEach((t) => {
      let creator = membersMap.get(t.creatorId);
      if (!creator && t.creatorId.includes(TEMP_USER_ID)) {
        const [_, annonymousId] = t.creatorId.split(TEMP_USER_ID);
        if (annonymousId) {
          membersMap.set(annonymousId, getTemUser(annonymousId, {}));
        }
        creator = membersMap.get(annonymousId);
      }
      if (creator)
        mappedTasks.push({
          ...t,
          creator,
        });
    });

    return {
      ...todoListWithMembers,
      tasks: mappedTasks,
    };
  }

  public async getExtendedTodoListsForUser(
    userId: string
  ): Promise<IExtendedTodoListDto[]> {
    const { todoLists, users } = await this.getTodoListsWithMembersForUser(
      userId
    );
    const todoListIDs = todoLists.map((td) => td.id);

    const tasks = await this.taskService.getTasksByTodoListIDs(
      todoListIDs,
      undefined,
      undefined,
      userId
    );

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
