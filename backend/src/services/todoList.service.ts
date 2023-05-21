import {
  mapTodoListToAttachedTodoList,
  TodoListCollectionName,
  TodoListCollectionType,
} from "dbSchemas/todoList.schema";
import { inject, injectable } from "inversify";
import {
  IExtendedTodoListDto,
  ITodoListWithMembersDto,
} from "linked-models/todoList/todoList.dto";
import {
  ITodoList,
  ITodoListAttached,
  ITodoListWithReadonlyProperties,
} from "linked-models/TodoList/TodoList.model";
import { TaskService } from "./task.service";
import { UserService } from "./user.service";

@injectable()
export class TodoListService {
  constructor(
    @inject(TodoListCollectionName)
    private readonly todoListCollection: TodoListCollectionType,
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(UserService)
    private readonly userService: UserService
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
        ? this.userService.getUsersByEmails(todoList.assignedUsers)
        : [],
      todoList.assignedOwners
        ? this.userService.getUsersByEmails(todoList.assignedOwners)
        : [],
    ]);

    return { ...todoList, assignedUsers: users, assignedOwners: owners };
  }

  public async getTodoListsWithMembersForUser(
    userId: string
  ): Promise<ITodoListWithMembersDto[]> {
    const todoLists = await this.getTodoListsForUser(userId);

    const memberEmails = new Set<string>();
    todoLists.forEach((t) => {
      t.assignedOwners?.forEach(memberEmails.add, memberEmails);
      t.assignedUsers?.forEach(memberEmails.add, memberEmails);
    });

    const members = await this.userService.getUsersByEmails(
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

    return todoListsWithMembers;
  }

  public async getExtendedTodoListById(
    todoListId: string
  ): Promise<IExtendedTodoListDto | undefined> {
    const [todoList, tasks] = await Promise.all([
      this.getTodoListWithMembersById(todoListId),
      this.taskService.getTasksByTodoListId(todoListId),
    ]);
    if (!todoList) return undefined;

    return { ...todoList, tasks };
  }

  public async getExtendedTodoListsForUser(
    userId: string
  ): Promise<IExtendedTodoListDto[]> {
    const todoLists = await this.getTodoListsWithMembersForUser(userId);
    const todoListIDs = todoLists.map((td) => td.id);

    const tasks = await this.taskService.getTasksByTodoListIDs(todoListIDs);

    return todoLists.map((td) => ({
      ...td,
      tasks: tasks.filter((t) => t.todoListId === td.id),
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
        this.userService.getUsersByEmails(mappedCreatedTodoList.assignedOwners),
      mappedCreatedTodoList.assignedUsers &&
        this.userService.getUsersByEmails(mappedCreatedTodoList.assignedUsers),
    ]);

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
    if (todoListData.name) update.name = todoListData.name;
    if (todoListData.icon) update.icon = todoListData.icon;
    //todo: check users
    if (todoListData.assignedOwners)
      update.assignedOwners = todoListData.assignedOwners;
    if (todoListData.assignedOwners)
      update.assignedOwners = todoListData.assignedOwners;

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

    return mapTodoListToAttachedTodoList(deletedTodoList);
  }
}
