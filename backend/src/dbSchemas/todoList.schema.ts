import {
  ITodoListAttached,
  ITodoListWithReadonlyProperties,
} from "linked-models/todoList/todoList.model";
import mongoose, { Document } from "mongoose";

export const TodoListCollectionName = "todoLists";

const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
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
  assignedUsers: {
    type: [String],
    required: false,
  },
});

export interface ITodoListDocument
  extends ITodoListWithReadonlyProperties,
    Document {}

export type TodoListCollectionType = mongoose.Model<ITodoListDocument>;
export const getTodoListCollection = () =>
  mongoose.model<ITodoListDocument>(TodoListCollectionName, todoListSchema);

export const mapTodoListToAttachedTodoList = (
  todoList: ITodoListDocument
): ITodoListAttached => {
  return {
    id: todoList.id,
    name: todoList.name,
    creator: todoList.creator,
    assignedUsers: todoList.assignedUsers,
    whenCreated: todoList.whenCreated,
    whenUpdated: todoList.whenUpdated,
  };
};