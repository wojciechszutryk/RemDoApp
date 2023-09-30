import {
  PushSubscriptionCollectionName,
  PushSubscriptionCollectionType,
  mapPushSubscriptionToAttachedPushSubscription,
} from "dbSchemas/pushSubscription.schema";
import { inject } from "inversify";
import {
  BaseHttpController,
  Controller,
  controller,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IPushSubscription } from "linked-models/pushSubscription/pushSubscription.model";
import {
  URL_PUSH,
  URL_SUBSCRIBE,
} from "linked-models/pushSubscription/pushSubscription.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";

@controller(URL_PUSH, SetCurrentUser)
export class PushSubscriptionController
  extends BaseHttpController
  implements Controller
{
  constructor(
    @inject(PushSubscriptionCollectionName)
    private readonly pushSubscriptionCollection: PushSubscriptionCollectionType
  ) {
    super();
  }

  @httpPost(URL_SUBSCRIBE)
  async subscribeForPushNotification(
    @requestBody() body: IPushSubscription
  ): Promise<OkResult> {
    if (
      !body.endpoint ||
      !body.keys.auth ||
      !body.keys.p256dh ||
      !body.expirationTime
    ) {
      return this.json(
        {
          error:
            "Invalid request body, endpoint, keys, expirationTime required",
        },
        400
      );
    }

    const createdSubscription = await this.pushSubscriptionCollection.create(
      body
    );

    return this.ok(
      mapPushSubscriptionToAttachedPushSubscription(createdSubscription)
    );
  }
}
