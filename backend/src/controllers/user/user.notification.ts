import { PARAM_CURRENT_USER } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPut,
  interfaces,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IUpdateUserNotificationDto } from "linked-models/notification/notification.dto";
import { URL_USER_NOTIFICATIONS } from "linked-models/notification/notification.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_USERS } from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { NotificationService } from "services/notification/notification.service";

@controller(URL_USERS + URL_USER_NOTIFICATIONS, SetCurrentUser)
export class NotificationController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(NotificationService)
    private readonly notificationService: NotificationService
  ) {
    super();
  }

  @httpGet("")
  async getNotificationsForUser(
    @requestParam(PARAM_CURRENT_USER) currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const notifications =
        await this.notificationService.getNotificationsForUser(currentUser.id);

      return this.ok(notifications);
    } catch (err) {
      return this.json(err, 400);
    }
  }

  @httpPut("")
  async editUserNotification(
    @requestParam(PARAM_CURRENT_USER) currentUser: IUserAttached,
    @requestBody() updateData: IUpdateUserNotificationDto[]
  ): Promise<OkResult> {
    try {
      const userNotificationIDs = updateData.map(
        (un) => un.editedUserNotificationId
      );
      await this.notificationService.returnValidatedUserNotifications(
        userNotificationIDs,
        currentUser.id
      );

      const updatedUserNotifications =
        await this.notificationService.updateUserNotifications(updateData);

      return this.ok(updatedUserNotifications);
    } catch (err) {
      return this.json(err, 400);
    }
  }

  @httpDelete("")
  async deleteUserNotifications(
    @requestParam(PARAM_CURRENT_USER) currentUser: IUserAttached,
    @queryParam("ids") userNotificationIDsQueryParam: string
  ): Promise<OkResult> {
    try {
      const userNotificationIDs: string[] = JSON.parse(
        userNotificationIDsQueryParam
      );

      const userNotifications =
        await this.notificationService.returnValidatedUserNotifications(
          userNotificationIDs,
          currentUser.id
        );

      await this.notificationService.deleteUserNotifications(userNotifications);

      return this.ok();
    } catch (err) {
      return this.json(err, 400);
    }
  }
}
