import {
  OrderCollectionName,
  OrderCollectionType,
  mapOrderToAttached,
} from "dbSchemas/order.schema";
import { inject, injectable } from "inversify";
import { IOrder, IOrderAttached } from "linked-models/order/order.model";
import { IUserAttached } from "linked-models/user/user.model";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderCollectionName)
    private readonly orderCollection: OrderCollectionType
  ) {}

  public async getAllOrdersForUser(userId: string): Promise<IOrderAttached[]> {
    const orders = await this.orderCollection.find({
      userId,
    });

    return orders.map((o) => mapOrderToAttached(o));
  }

  public async getTasksOrderInTodoList(
    userId: string,
    todoListId: string
  ): Promise<IOrderAttached[]> {
    const orders = await this.orderCollection.find({
      userId,
      todoListId,
    });

    return orders.map((o) => mapOrderToAttached(o));
  }

  /**
   * This method does not check user priviliges to upsert
   */
  public async upsertOrdersForUser(
    ordersData: IOrder[],
    user: IUserAttached
  ): Promise<IOrderAttached[]> {
    await this.orderCollection.bulkWrite(
      ordersData.map(({ value, todoListId, taskId }) => ({
        updateOne: {
          filter: { user: user.id, todoListId, taskId },
          update: {
            value,
            user: user.id,
            todoListId,
            taskId,
          },
          upsert: true,
        },
      }))
    );

    const todoListIDs: string[] = [];
    const taskIDs: string[] = [];
    ordersData.forEach((o) => {
      if (o.todoListId) {
        todoListIDs.push(o.todoListId);
      }
      if (o.taskId) {
        taskIDs.push(o.taskId);
      }
    });

    const newOrders = await this.orderCollection.find({
      user: user.id,
      todoListId: { $in: todoListIDs },
      taskId: { $in: taskIDs },
    });

    return newOrders.map((o) => mapOrderToAttached(o));
  }

  public async deleteOrdersByTaskId(taskId: string): Promise<void> {
    await this.orderCollection.deleteMany({
      taskId,
    });
  }

  public async deleteOrdersByTodoListId(todoListId: string): Promise<void> {
    await this.orderCollection.deleteMany({
      todoListId,
    });
  }
}
