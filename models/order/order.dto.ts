import { IOrder } from "./order.model";

export type UpsertOrderDTO = Omit<IOrder, "user">;
