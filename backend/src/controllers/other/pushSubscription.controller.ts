import {
  PushSubscriptionCollectionName,
  PushSubscriptionCollectionType,
} from "dbSchemas/pushSubscription.schema";
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
import { sendNotification } from "web-push";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@controller(URL_PUSH, SetCurrentUser)
export class PushSubscriptionController extends BaseHttpController {
  constructor(
    @inject(PushSubscriptionCollectionName)
    private readonly pushSubscriptionCollection: PushSubscriptionCollectionType
  ) {
    super();
  }

  @httpGet("")
  async getPushSubscription(): Promise<OkResult> {
    const pushSubscription = await this.pushSubscriptionCollection.findOne();
    return this.json(pushSubscription);
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

    const createdSubscription = await this.pushSubscriptionCollection.create({
      ...body,
      userId: currentUser.id,
    });

    const options = {
      vapidDetails: {
        subject: "mailto:wojtekszutryk@gmail.com",
        publicKey: process.env.VAPID_PUBLIC_KEY!,
        privateKey: process.env.VAPID_PRIVATE_KEY!,
      },
    };

    try {
      const res2 = await sendNotification(
        createdSubscription,
        JSON.stringify({
          title: "Hello from server",
          description: "this message is coming from the server",
          image:
            "https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg",
        }),
        options
      );
      return this.ok();
    } catch (error) {
      return this.json({ error }, 500);
    }
  }
}
