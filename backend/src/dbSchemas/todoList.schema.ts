import {
  ITodoListAttached,
  ITodoListWithReadonlyProperties,
} from "linked-models/todoList/todoList.model";
import mongoose, { Document } from "mongoose";

export const TodoListCollectionName = "todoLists";

const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creatorId: {
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
  icon: { type: String, required: true },
  assignedUsers: {
    type: [String],
    required: false,
  },
  assignedOwners: {
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
    creatorId: todoList.creatorId,
    icon: todoList.icon,
    assignedUsers: todoList.assignedUsers,
    assignedOwners: todoList.assignedOwners,
    whenCreated: todoList.whenCreated,
    whenUpdated: todoList.whenUpdated,
  };
};
