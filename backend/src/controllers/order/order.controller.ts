import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPut,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { TodoListPermissions } from "linked-models/permissions/todoList.permissions.enum";
import { IOrderDTO } from "linked-models/order/order.dto";
import { URL_ORDERS } from "linked-models/order/order.urls";
import { parseTaskDateFields } from "linked-models/task/task.dto";
import { TASK_PARAM, URL_TASK } from "linked-models/task/task.urls";
import {
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { CheckPermission } from "middlewares/permissions/checkPermission.middleware";
import { SetPermissionsAndScopes } from "middlewares/permissions/setPermissionsAndScopes.middleware";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { OrderService } from "services/order/order.service";

@controller(
  URL_TODO_LISTS + URL_TODO_LIST() + URL_ORDERS + URL_TASK(),
  SetCurrentUser
)
export class OrderController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(OrderService) private readonly orderService: OrderService
  ) {
    super();
  }

  @httpPut(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanEditTask)
  )
  async editOrder(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: Partial<IOrderDTO>
  ): Promise<OkResult> {
    if (Object.values(body).length === 0) return this.json("Invalid data", 400);

    try {
      const order = await this.orderService.editOrder(
        todoListId,
        taskId,
        parseTaskDateFields(body),
        currentUser
      );

      return this.ok(order);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }

  @httpDelete(
    "",
    SetPermissionsAndScopes,
    CheckPermission(TodoListPermissions.CanDeleteTask)
  )
  async deleteOrder(
    @requestParam(TASK_PARAM) taskId: string,
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    try {
      const deletedOrder = await this.orderService.deleteOrder(
        taskId,
        currentUser.id
      );

      return this.ok(deletedOrder);
    } catch (error) {
      if (error instanceof Error) {
        return this.json(error.message, 400);
      }

      return this.statusCode(400);
    }
  }
}
