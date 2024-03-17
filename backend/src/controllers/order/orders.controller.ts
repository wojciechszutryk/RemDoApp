import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IOrderDTO } from "linked-models/order/order.dto";
import { URL_ORDERS } from "linked-models/order/order.urls";
import { IUserAttached } from "linked-models/user/user.model";
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

  @httpGet("")
  async getTodoListsForUser(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {}

  @httpPost("")
  async createOrder(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: IOrderDTO
  ): Promise<OkResult> {
    try {
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
