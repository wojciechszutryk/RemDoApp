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
import { IOrder } from "linked-models/order/order.model";
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
  ): Promise<OkResult> {
    try {
      const orders = await this.orderService.getAllOrdersForUser(
        currentUser.id
      );
      return this.json(orders);
    } catch (error) {
      return this.statusCode(400);
    }
  }

  @httpPost("")
  async upsertOrder(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IOrder>
  ): Promise<OkResult> {
    try {
      if (!body) return this.json("Data is required", 400);
      if (!currentUser) return this.json("User is required", 400);
      if (!body.value) return this.json("Value is required", 400);
      if (!body.taskId || !body.todoListId)
        return this.json("Task or TodoList are required", 400);

      const order = await this.orderService.upsertOrder(body, currentUser);
      return this.json(order);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
