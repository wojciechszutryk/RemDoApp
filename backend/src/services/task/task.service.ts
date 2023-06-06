import {
  mapTaskToAttachedTask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { EventService } from "framework/events/event.service";
import {
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from "framework/events/implementation/task.events";
import { inject, injectable } from "inversify";
import { ITaskDTO, mapITaskDTOToITask } from "linked-models/task/task.dto";
import {
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType,
    @inject(EventService)
    private readonly eventService: EventService
  ) {}

  public async getTaskById(id: string): Promise<ITaskAttached | undefined> {
    const foundTask = await this.taskCollection.findOne({ _id: id });
    if (!foundTask) return undefined;

    return mapTaskToAttachedTask(foundTask);
  }

  public async getTasksByTodoListId(
    todoListId: string
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({ todoListId });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async getTasksByTodoListIDs(
    todoListIDs: string[]
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({
      todoListId: { $in: todoListIDs },
    });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async createTaskInTodoList(
    todoListId: string,
    task: ITaskDTO,
    creatorId: string
  ): Promise<ITaskAttached> {
    const newTask: ITaskWithReadonlyProperties = {
      ...mapITaskDTOToITask(task),
      todoListId,
      creatorId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTask = await this.taskCollection.create(newTask);

    const mappedCreatedTask = mapTaskToAttachedTask(createdTask);

    this.eventService.emit(TaskCreatedEvent, mappedCreatedTask);

    return mapTaskToAttachedTask(createdTask);
  }
  /**
   * Warning this service doesn't check if user can update Task. It is assumed that proper check is done before using this service
   */
  public async updateTask(
    taskId: string,
    updateData: Partial<ITaskDTO>
  ): Promise<ITaskAttached> {
    const update = {
      ...mapITaskDTOToITask(updateData),
      important: updateData.important ?? false,
      whenUpdated: new Date(),
    };

    const updatedTask = await this.taskCollection.findByIdAndUpdate(
      taskId,
      update,
      { new: true }
    );

    if (!updatedTask)
      throw new Error(
        `Cannot update task: ${taskId}, because it does not exist.`
      );

    const mappedUpdatedTask = mapTaskToAttachedTask(updatedTask);

    this.eventService.emit(TaskUpdatedEvent, mappedUpdatedTask);

    return mappedUpdatedTask;
  }

  /**
   * Warning this service doesn't check if user can delete Task. It is assumed that proper check is done before using this service
   */
  public async deleteTask(taskId: string): Promise<ITaskAttached> {
    const deletedTask = await this.taskCollection.findByIdAndDelete(taskId);

    if (!deletedTask)
      throw new Error(
        `Cannot delete task: ${taskId}, because it does not exist.`
      );

    const mappedDeletedTask = mapTaskToAttachedTask(deletedTask);

    this.eventService.emit(TaskUpdatedEvent, mappedDeletedTask);

    return mappedDeletedTask;
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await this.taskCollection.deleteMany({
      todoListId,
    });
  }
}
