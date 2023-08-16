import {
  ITaskDocument,
  mapTaskToAttachedTask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { EventService } from "framework/events/event.service";
import { inject, injectable } from "inversify";
import {
  TaskCreatedEvent,
  TaskUpdatedEvent,
} from "linked-models/event/implementation/task.events";
import {
  ITask,
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";
import { FilterQuery } from "mongoose";

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

  public async getTasksByIDs(taskIDs: string[]): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({
      _id: { $in: taskIDs },
    });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async getTasksByTodoListId(
    todoListId: string
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({ todoListId });

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async getTasksByTodoListIDs(
    todoListIDs: string[],
    minStartDate?: Date,
    maxStartDate?: Date
  ): Promise<ITaskAttached[]> {
    const filter: FilterQuery<ITaskDocument> = {
      todoListId: { $in: todoListIDs },
    };
    if (minStartDate) filter.startDate = { $gte: minStartDate };
    if (maxStartDate) filter.startDate = { $lte: maxStartDate };
    const foundTasks = await this.taskCollection.find(filter);

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async createTaskInTodoList(
    todoListId: string,
    task: ITask,
    creatorId: string,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const newTask: ITaskWithReadonlyProperties = {
      text: task.text,
      startDate: task.startDate,
      finishDate: task.finishDate,
      completionDate: task.completionDate,
      important: task.important ?? false,
      todoListId,
      creatorId,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTask = await this.taskCollection.create(newTask);

    const mappedCreatedTask = mapTaskToAttachedTask(createdTask);

    if (generateEvent)
      this.eventService.emit(TaskCreatedEvent, creatorId, mappedCreatedTask);

    return mapTaskToAttachedTask(createdTask);
  }

  /**
   * Warning this service doesn't check if user can update Task. It is assumed that proper check is done before using this service
   */
  public async updateTask(
    taskId: string,
    updateData: Partial<ITask>,
    updaterId: string,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const update = {
      ...updateData,
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

    if (generateEvent)
      this.eventService.emit(TaskUpdatedEvent, updaterId, mappedUpdatedTask);

    return mappedUpdatedTask;
  }

  /**
   * Warning this service doesn't check if user can delete Task. It is assumed that proper check is done before using this service
   */
  public async deleteTask(
    taskId: string,
    deleterId: string,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const deletedTask = await this.taskCollection.findByIdAndDelete(taskId);

    if (!deletedTask)
      throw new Error(
        `Cannot delete task: ${taskId}, because it does not exist.`
      );

    const mappedDeletedTask = mapTaskToAttachedTask(deletedTask);

    if (generateEvent)
      this.eventService.emit(TaskUpdatedEvent, deleterId, mappedDeletedTask);

    return mappedDeletedTask;
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await this.taskCollection.deleteMany({
      todoListId,
    });
  }
}
