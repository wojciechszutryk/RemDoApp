import {
  ITaskDocument,
  mapTaskToAttachedTask,
  TaskCollectionName,
  TaskCollectionType,
} from "dbSchemas/task.schema";
import { EventService } from "framework/events/event.service";
import { extractPropertiesToUpdate } from "helpers/extractPropertiesToUpdate";
import { inject, injectable } from "inversify";
import { EventName } from "linked-models/event/event.enum";
import {
  TaskCreatedEvent,
  TaskDeletedEvent,
  TaskUpdatedEvent,
} from "linked-models/event/implementation/task.events";
import {
  ITask,
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";
import { IUserAttached } from "linked-models/user/user.model";
import { FilterQuery } from "mongoose";
import { scheduledJobs } from "node-schedule";
import { ScheduleNotificationService } from "services/notification/schedule.notification.service";
import { SearchHistoryDeleteService } from "services/search/search.history.delete.service";

@injectable()
export class TaskService {
  constructor(
    @inject(TaskCollectionName)
    private readonly taskCollection: TaskCollectionType,
    @inject(EventService)
    private readonly eventService: EventService,
    @inject(SearchHistoryDeleteService)
    private readonly searchHistoryDeleteService: SearchHistoryDeleteService,
    @inject(ScheduleNotificationService)
    private readonly scheduleNotificationService: ScheduleNotificationService
  ) {}
  private addNotifyDateToTasks(
    tasks: ITaskAttached[],
    userId: string
  ): ITaskAttached[] {
    return tasks.map((t) => {
      const jobName = this.scheduleNotificationService.createScheduleJobName(
        userId,
        t.id
      );

      const job = scheduledJobs[jobName];

      return {
        ...t,
        notifyDate: job?.nextInvocation(),
      };
    });
  }

  public async getTaskById(
    id: string,
    /** if userId is provided, notifyDate field might be added to task in context of this user */
    userId?: string
  ): Promise<ITaskAttached | undefined> {
    const foundTask = await this.taskCollection.findOne({ _id: id });
    if (!foundTask) return undefined;

    if (userId) {
      return this.addNotifyDateToTasks(
        [mapTaskToAttachedTask(foundTask)],
        userId
      )[0];
    }

    return mapTaskToAttachedTask(foundTask);
  }

  public async getTasksByIDs(
    taskIDs: string[],
    /** if userId is provided, notifyDate field might be added to task in context of this user */
    userId?: string
  ): Promise<ITaskAttached[]> {
    const foundTasks = await this.taskCollection.find({
      _id: { $in: taskIDs },
    });

    const mappedTasks = foundTasks.map((t) => mapTaskToAttachedTask(t));

    if (userId) return this.addNotifyDateToTasks(mappedTasks, userId);

    return mappedTasks;
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
    maxStartDate?: Date,
    /** if userId is provided, notifyDate field might be added to task in context of this user */
    userId?: string
  ): Promise<ITaskAttached[]> {
    const filter: FilterQuery<ITaskDocument> = {
      todoListId: { $in: todoListIDs },
    };
    if (minStartDate) filter.startDate = { $gte: minStartDate };
    if (maxStartDate) filter.startDate = { $lte: maxStartDate };
    const foundTasks = await this.taskCollection.find(filter);

    if (userId) {
      return foundTasks.map((t) => {
        const jobName = this.scheduleNotificationService.createScheduleJobName(
          userId,
          t.id
        );

        const job = scheduledJobs[jobName];

        return {
          ...mapTaskToAttachedTask(t),
          notifyDate: job?.nextInvocation(),
        };
      });
    }

    return foundTasks.map((t) => mapTaskToAttachedTask(t));
  }

  public async createTaskInTodoList(
    todoListId: string,
    task: ITask,
    creator: IUserAttached,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const newTask: ITaskWithReadonlyProperties = {
      text: task.text,
      link: task.link,
      description: task.description,
      startDate: task.startDate,
      finishDate: task.finishDate,
      completionDate: task.completionDate,
      todoListId,
      recurrance: task.recurrance,
      creatorId: creator.id,
      whenCreated: new Date(),
      whenUpdated: new Date(),
    };

    const createdTask = await this.taskCollection.create(newTask);

    const mappedCreatedTask = mapTaskToAttachedTask(createdTask);

    if (generateEvent)
      this.eventService.emit(TaskCreatedEvent, creator.id, {
        payload: { ...mappedCreatedTask, notifyDate: task.notifyDate },
        eventCreator: creator,
      });

    return { ...mappedCreatedTask, notifyDate: task.notifyDate };
  }

  /**
   * Warning this service doesn't check if user can update Task. It is assumed that proper check is done before using this service
   */
  public async updateTask(
    taskId: string,
    updateData: Partial<ITask>,
    editor: IUserAttached,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const taskKeys: (keyof ITask)[] = [
      "text",
      "startDate",
      "finishDate",
      "completionDate",
      "notifyDate",
      "recurrance",
      "link",
      "description",
    ];

    const validUpdateProperties = extractPropertiesToUpdate(
      updateData,
      taskKeys
    );

    const updatedTask = await this.taskCollection.findByIdAndUpdate(
      taskId,
      {
        ...validUpdateProperties,
        whenUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedTask)
      throw new Error(
        `Cannot update task: ${taskId}, because it does not exist.`
      );

    const mappedUpdatedTask = mapTaskToAttachedTask(updatedTask);

    if (generateEvent) {
      const updateFieldsSize = Object.values(validUpdateProperties).filter(
        (v) => v !== undefined
      ).length;

      let eventName = EventName.TaskUpdated;

      if (
        updateFieldsSize === 1 &&
        validUpdateProperties.hasOwnProperty("completionDate")
      ) {
        eventName = EventName.TaskStateChanged;
      } else if (
        (updateFieldsSize === 1 || updateFieldsSize === 2) &&
        (!!validUpdateProperties.startDate ||
          !!validUpdateProperties.finishDate)
      ) {
        eventName = EventName.TaskRescheduled;
      }

      this.eventService.emit(TaskUpdatedEvent, editor.id, {
        payload: {
          ...mappedUpdatedTask,
          notifyDate: updateData.notifyDate,
          updateType: eventName,
        },
        eventCreator: editor,
      });
    }

    return { ...mappedUpdatedTask, notifyDate: updateData.notifyDate };
  }

  /**
   * Warning this service doesn't check if user can delete Task. It is assumed that proper check is done before using this service
   */
  public async deleteTask(
    taskId: string,
    deleterId: string,
    generateEvent = true
  ): Promise<ITaskAttached> {
    const [deletedTask] = await Promise.all([
      this.taskCollection.findByIdAndDelete(taskId),
      this.searchHistoryDeleteService.deleteSearchHistoryRecords({
        searchedTaskId: taskId,
      }),
    ]);

    if (!deletedTask)
      throw new Error(
        `Cannot delete task: ${taskId}, because it does not exist.`
      );

    const mappedDeletedTask = mapTaskToAttachedTask(deletedTask);

    if (generateEvent)
      this.eventService.emit(TaskDeletedEvent, deleterId, mappedDeletedTask);

    return mappedDeletedTask;
  }

  public async deleteTasksByTodoListId(todoListId: string): Promise<void> {
    await Promise.all([
      this.taskCollection.deleteMany({
        todoListId,
      }),
      this.searchHistoryDeleteService.deleteSearchHistoryRecords({
        searchedTodoListId: todoListId,
      }),
    ]);
  }
}
