import {
  mapTaskToAttachedtask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { inject, injectable } from "inversify";
import {
  ITask,
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType
  ) {}

  public async getAllTasks(): Promise<ITaskAttached[]> {
    const allTasks = await this.taskCollection.find();

    return allTasks.map((t) => mapTaskToAttachedtask(t));
  }

  public async getTaskById(id: string): Promise<ITaskAttached | undefined> {
    const foundTask = await this.taskCollection.findOne({ _id: id });
    if (!foundTask) return undefined;

    return mapTaskToAttachedtask(foundTask);
  }

  public async getTasksByTodoListId(
    todoListId: string
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({ todoListId });

    return foundTasks.map((t) => mapTaskToAttachedtask(t));
  }

  /**
   * Warning this service doesn't check if user can update Task. It is assumed that proper check is done before using this service
   */
  public async updateTask(
    taskId: string,
    updateData: Partial<ITask>
  ): Promise<ITaskAttached> {
    const update = {
      ...updateData,
      whenUpdated: new Date(),
    };

    const updatedTask = await this.taskCollection.findByIdAndUpdate(
      taskId,
      update,
      { new: true }
    );

    if (!updatedTask)
      throw new Error(
        `Cannot update todoList: ${taskId}, because it does not exist.`
      );

    return mapTaskToAttachedtask(updatedTask);
  }

  /**
   * Warning this service doesn't check if user can delete Task. It is assumed that proper check is done before using this service
   */
  public async deleteTask(taskId: string): Promise<void> {
    const deletedTask = await this.taskCollection.findByIdAndDelete(taskId);

    if (!deletedTask)
      throw new Error(
        `Cannot delete task: ${taskId}, because it does not exist.`
      );
  }

  public async createTaskInTodoList(
    todoListId: string,
    task: ITask,
    creator: string
  ): Promise<ITaskAttached> {
    const newTask: ITaskWithReadonlyProperties = {
      ...task,
      todoListId,
      creator,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTask = await this.taskCollection.create(newTask);

    return mapTaskToAttachedtask(createdTask);
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await this.taskCollection.deleteMany({
      todoListId,
    });
  }
}
