import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IPushSubscription } from "linked-models/pushSubscription/pushSubscription.model";
import {
  URL_PUSH,
  URL_SUBSCRIBE,
} from "linked-models/pushSubscription/pushSubscription.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { PushNotificationService } from "services/notification/push.notification.service";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@controller(URL_PUSH, SetCurrentUser)
export class PushSubscriptionController extends BaseHttpController {
  constructor(
    @inject(PushNotificationService)
    private readonly pushNotificationService: PushNotificationService
  ) {
    super();
  }

  @httpGet("")
  async getPushSubscriptionsForCurrentUser(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    if (!currentUser) {
      return this.json({ error: "User not found" }, 403);
    }

    const pushSubscriptions =
      await this.pushNotificationService.getSubscriptionsForUsers([
        currentUser.id,
      ]);
    return this.ok(pushSubscriptions);
  }

  @httpPost(URL_SUBSCRIBE)
  async subscribeForPushNotification(
    @requestBody() body: IPushSubscription,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    if (!currentUser) {
      return this.json({ error: "User not found" }, 403);
    }

    if (!body.endpoint || !body.keys.auth || !body.keys.p256dh) {
      return this.json(
        {
          error:
            "Invalid request body, endpoint, keys, expirationTime required",
        },
        400
      );
    }

    const createdSubscription =
      await this.pushNotificationService.createPushSubscription(
        body,
        currentUser.id
      );

    return this.ok(createdSubscription);
  }
}
