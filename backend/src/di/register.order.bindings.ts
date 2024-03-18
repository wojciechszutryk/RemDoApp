import { OrderCollectionName } from "dbSchemas/order.schema";
import { getUserCollection } from "dbSchemas/user.schema";
import { Container } from "inversify";
import { OrderService } from "services/order/order.service";

export const registerOrderBindings = (container: Container) => {
  container.bind(OrderCollectionName).toDynamicValue(() => getUserCollection());
  container.bind(OrderService).toSelf();
};
