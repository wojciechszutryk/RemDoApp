import {
  ITodoListAttached,
  ITodoListWithReadonlyProperties,
} from "linked-models/todoList/todoList.model";
import mongoose, { Document } from "mongoose";

export const todoListCollectionName = "todoLists";

const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  token: { type: String, required: false },
  creator: {
    type: String,
    required: true,
  },
  whenCreated: {
    type: Date,
    required: true,
  },
  whenUpdated: {
    type: Date,
    required: false,
  },
});

export interface ITodoListDocument
  extends ITodoListWithReadonlyProperties,
    Document {}

export const TodoListCollection = mongoose.model<ITodoListDocument>(
  todoListCollectionName,
  todoListSchema
);

export type todoListCollectionType = mongoose.Model<ITodoListDocument>;
export const getTodoListCollection = () =>
  mongoose.model<ITodoListDocument>(todoListCollectionName, todoListSchema);

export const maptodoListToAttachedtodoList = (
  todoList: ITodoListDocument
): ITodoListAttached => {
  return {
    id: todoList.id,
    name: todoList.name,
    token: todoList.token,
    creator: todoList.creator,
    whenCreated: todoList.whenCreated,
    whenUpdated: todoList.whenUpdated,
  };
};
