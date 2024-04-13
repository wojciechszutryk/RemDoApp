import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { UpsertOrderDTO } from "linked-models/order/order.dto";
import { URL_ORDERS } from "linked-models/order/order.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { URL_USER, URL_USERS, USER_PARAM } from "linked-models/user/user.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { OrderService } from "services/order/order.service";

@controller(URL_ORDERS, SetCurrentUser)
export class OrdersController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(OrderService) private readonly orderService: OrderService
  ) {
    super();
  }

  @httpPost(`${URL_USERS}${URL_USER()}`)
  async upsertOrders(
    @currentUser() currentUser: IUserAttached,
    @requestParam(USER_PARAM) userIdFromParam: string,
    @requestBody() body: { data: UpsertOrderDTO[] }
  ): Promise<OkResult> {
    try {
      if (!currentUser) return this.json("User is required", 400);
      if (currentUser.id !== userIdFromParam)
        this.json("You are not allowed to update someone else's orders");

      const orders = await this.orderService.upsertOrdersForUser(
        body.data,
        currentUser
      );
      return this.ok(orders);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
