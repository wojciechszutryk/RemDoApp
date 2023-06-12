import {
  NotificationCollectionName,
  NotificationCollectionType,
} from "dbSchemas/notification.schema";
import {
  UserNotificationCollectionName,
  UserNotificationCollectionType,
  mapUserNotificationToAttachedUserNotification,
} from "dbSchemas/userNotification.schema";
import { inject, injectable } from "inversify";
import { INotificationDto } from "linked-models/notification/notification.dto";
import { IUserNotificationAttached } from "linked-models/notification/userNotification.model";

@injectable()
export class NotificationService {
  constructor(
    @inject(NotificationCollectionName)
    private readonly notificationCollection: NotificationCollectionType,
    @inject(UserNotificationCollectionName)
    private readonly userNotificationCollection: UserNotificationCollectionType
  ) {}

  public async getUserNotification(
    userNotificationId: string
  ): Promise<IUserNotificationAttached | undefined> {
    const foundUserNotification =
      await this.userNotificationCollection.findById(userNotificationId);

    if (!foundUserNotification) return undefined;

    return mapUserNotificationToAttachedUserNotification(foundUserNotification);
  }

  public async getNotificationsForUser(
    userId: string
  ): Promise<INotificationDto[]> {
    const notifications = await this.userNotificationCollection.aggregate([
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
          notificationId: { $toString: "$notification._id" },
          userId: 1,
          state: 1,
          message: "$notification.message",
          todoListId: "$notification.todoListId",
          taskId: "$notification.taskId",
          whenCreated: "$notification.whenCreated",
        },
      },
    ]);

    return notifications;
  }

  public async createNotificationForUsers(
    userIDs: string[],
    message: string,
    todoListId?: string,
    taskId?: string
  ): Promise<INotificationDto[]> {
    const notification = await this.notificationCollection.create({
      message,
      todoListId,
      taskId,
      whenCreated: new Date(),
    });

    const userNotifications = await this.userNotificationCollection.create(
      userIDs.map((userId) => ({
        userId,
        notificationId: notification._id,
        whenCreated: new Date(),
      }))
    );

    return userNotifications.map((un) => ({
      notificationId: notification._id,
      userNotificationId: un._id,
      userId: un.userId,
      state: un.state,
      message: notification.message,
      todoListId: notification.todoListId,
      taskId: notification.taskId,
    }));
  }

  public async updateUserNotification(
    userNotificationId: string,
    body: Partial<IUserNotificationAttached>
  ): Promise<IUserNotificationAttached | undefined> {
    const updatedUserNotification =
      await this.userNotificationCollection.findByIdAndUpdate(
        userNotificationId,
        body,
        { new: true }
      );

    if (!updatedUserNotification) return undefined;
    return mapUserNotificationToAttachedUserNotification(
      updatedUserNotification
    );
  }
}
