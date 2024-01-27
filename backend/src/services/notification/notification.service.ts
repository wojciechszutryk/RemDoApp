import {
  NotificationCollectionName,
  NotificationCollectionType,
} from "dbSchemas/notification.schema";
import {
  UserNotificationCollectionName,
  UserNotificationCollectionType,
  mapUserNotificationToAttachedUserNotification,
} from "dbSchemas/userNotification.schema";
import { TEMP_USER_ID, getTemUser } from "framework/auth/tempUser.helper";
import { inject, injectable } from "inversify";
import { EventName, EventSubject } from "linked-models/event/event.enum";
import {
  INotificationDto,
  INotificationResponseDto,
  IUpdateUserNotificationDto,
} from "linked-models/notification/notification.dto";
import { UserNotificationState } from "linked-models/notification/notification.enum";
import { IUserNotificationAttached } from "linked-models/notification/userNotification.model";
import { TaskService } from "../task/task.service";
import { TodoListService } from "../todoList/todoList.service";
import { UserService } from "../user/user.service";

@injectable()
export class NotificationService {
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
    @inject(TaskService)
    private readonly taskService: TaskService,
    @inject(TodoListService)
    private readonly todoListService: TodoListService,
    @inject(NotificationCollectionName)
    private readonly notificationCollection: NotificationCollectionType,
    @inject(UserNotificationCollectionName)
    private readonly userNotificationCollection: UserNotificationCollectionType
  ) {}

  public async getUserNotificationsByIDs(
    userNotificationIDs: string[]
  ): Promise<IUserNotificationAttached[]> {
    const foundUserNotifications = await this.userNotificationCollection.find({
      _id: { $in: userNotificationIDs },
    });

    return foundUserNotifications.map((un) =>
      mapUserNotificationToAttachedUserNotification(un)
    );
  }

  public async returnValidatedUserNotifications(
    userNotificationIDs: string[],
    currentUserID: string
  ): Promise<IUserNotificationAttached[]> {
    const userNotifications = await this.getUserNotificationsByIDs(
      userNotificationIDs
    );

    if (!userNotifications) {
      throw new Error("User notifications could not be found.");
    }

    userNotifications.forEach((un) => {
      if (un.userId !== currentUserID) {
        return {
          throw: new Error(
            `User notification ${un.id} does not belong to user`
          ),
        };
      }
    });

    return userNotifications;
  }

  public async getNotificationsForUser(
    userId: string
  ): Promise<INotificationResponseDto> {
    const notifications: {
      userNotificationId: string;
      notificationId: string;
      userId: string;
      state: UserNotificationState;
      action: EventName;
      actionSubject: EventSubject;
      actionCreatorId: string;
      todoListId: string;
      taskId: string;
      whenCreated: Date;
    }[] = await this.userNotificationCollection.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $lookup: {
          from: "notifications",
          let: { notificationId: "$notificationId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$notificationId" }] },
              },
            },
          ],
          as: "notification",
        },
      },
      {
        $unwind: "$notification",
      },
      {
        $project: {
          _id: 0,
          userNotificationId: { $toString: "$_id" },
          notificationId: { $toString: "$notification._id" },
          userId: 1,
          state: 1,
          action: "$notification.action",
          actionSubject: "$notification.actionSubject",
          actionCreatorId: "$notification.actionCreatorId",
          todoListId: "$notification.todoListId",
          taskId: "$notification.taskId",
          whenCreated: "$notification.whenCreated",
        },
      },
    ]);

    const todoListIds = notifications.map((n) => n.todoListId);
    const taskIds = notifications.map((n) => n.taskId);
    const creatorIds = notifications.map((n) => n.actionCreatorId);

    const [todoLists, tasks, creators] = await Promise.all([
      this.todoListService.getTodoListByIDs(todoListIds),
      this.taskService.getTasksByIDs(taskIds, userId),
      this.userService.getUsersPublicDataByIDs(creatorIds),
    ]);

    return {
      notifications: notifications,
      todoLists: todoLists,
      tasks: tasks,
      creators: creators,
    };
  }

  public async createNotificationForUsers(
    userIDs: string[],
    action: EventName,
    actionSubject: EventSubject,
    actionCreatorId: string,
    todoListId?: string,
    taskId?: string
  ): Promise<INotificationDto[]> {
    const [notification, actionCreator] = await Promise.all([
      this.notificationCollection.create({
        action,
        actionSubject,
        actionCreatorId,
        todoListId,
        taskId,
        whenCreated: new Date(),
      }),
      actionCreatorId.includes(TEMP_USER_ID)
        ? getTemUser(actionCreatorId, {})
        : this.userService.getUserPublicData(actionCreatorId),
    ]);

    if (!actionCreator) throw new Error("Action creator could not be found.");

    const userNotifications = await this.userNotificationCollection.create(
      userIDs.map((userId) => ({
        userId,
        state: UserNotificationState.Fresh,
        notificationId: notification._id,
        whenCreated: new Date(),
      }))
    );

    return userNotifications.map((un) => ({
      notificationId: notification._id,
      userNotificationId: un._id,
      userId: un.userId,
      state: un.state,
      action: notification.action,
      actionSubject: notification.actionSubject,
      actionCreatorId: notification.actionCreatorId,
      todoListId: notification.todoListId,
      taskId: notification.taskId,
      actionCreator,
    }));
  }

  /**
   * Updates the user notifications with the given IDs.
   */
  public async updateUserNotifications(
    updateData: IUpdateUserNotificationDto[]
  ): Promise<IUserNotificationAttached[]> {
    const updatePromises = updateData.map((un) =>
      this.userNotificationCollection.findByIdAndUpdate(
        un.editedUserNotificationId,
        un,
        { new: true }
      )
    );

    const updatedUserNotifications = await Promise.all(updatePromises);

    if (updatedUserNotifications.includes(null)) {
      throw new Error("One or more user notifications could not be found.");
    }

    return updatedUserNotifications.map((un) =>
      mapUserNotificationToAttachedUserNotification(un!)
    );
  }

  /**
   * Deletes the userNotifications with the given IDs. If a notification is no longer referenced by any user notifications, it is also deleted.
   */
  public async deleteUserNotifications(
    userNotifications: IUserNotificationAttached[]
  ): Promise<void> {
    const userNotificationIDs = userNotifications.map((un) => un.id);
    const notificationIDsOccurrences = new Map();
    const notificationIDsToDelete = new Set();

    for (const obj of userNotifications) {
      const { notificationId } = obj;
      notificationIDsOccurrences.set(
        notificationId,
        (notificationIDsOccurrences.get(notificationId) || 0) + 1
      );

      if (notificationIDsOccurrences.get(notificationId) === 1) {
        notificationIDsToDelete.add(notificationId);
      } else {
        notificationIDsToDelete.delete(notificationId);
      }
    }

    await Promise.all([
      this.userNotificationCollection.deleteMany({
        _id: { $in: userNotificationIDs },
      }),
      this.notificationCollection.deleteMany({
        _id: { $in: Array.from(notificationIDsToDelete) },
      }),
    ]);
  }
}
