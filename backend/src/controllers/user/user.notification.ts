import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPut,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import {
  URL_USER_NOTIFICATION,
  URL_USER_NOTIFICATIONS,
  USER_NOTIFICATION_PARAM,
} from "linked-models/notification/notification.urls";
import { IUserNotification } from "linked-models/notification/userNotification.model";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_USERS } from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { NotificationService } from "services/notification.service";

@controller(URL_USERS + URL_USER_NOTIFICATIONS)
export class UserNotificationController extends BaseHttpController {
  constructor(
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {
    super();
  }

  @httpPut(URL_USER_NOTIFICATION(), SetCurrentUser)
  async editUserNotification(
    @requestParam(USER_NOTIFICATION_PARAM) userNotificationId: string,
    @requestParam(PARAM_CURRENT_USER) currentUser: IUserAttached,
    @requestBody() body: Partial<IUserNotification>
  ): Promise<OkResult> {
    const userNotification = await this.notificationService.getUserNotification(
      userNotificationId
    );

    if (!userNotification) {
      return this.json("User Notification not found", 404);
    }

    if (userNotification.userId !== currentUser.id) {
      return this.json("User Notification not found", 404);
    }

    const updatedUserNotification =
      await this.notificationService.updateUserNotification(
        userNotification.id,
        body
      );

    if (!updatedUserNotification)
      return this.json("Error while updating notification.", 500);

    return this.ok(updatedUserNotification);
  }
}
