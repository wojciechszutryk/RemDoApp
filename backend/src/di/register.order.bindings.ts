import {
  OrderCollectionName,
  getOrderCollection,
} from "dbSchemas/order.schema";
import { Container } from "inversify";
import { OrderService } from "services/order/order.service";

export const registerOrderBindings = (container: Container) => {
  container
    .bind(OrderCollectionName)
    .toDynamicValue(() => getOrderCollection());
  container.bind(OrderService).toSelf();
};
