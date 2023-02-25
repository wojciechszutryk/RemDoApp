import {
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";
import mongoose, { Document } from "mongoose";

export const TaskCollectionName = "tasks";

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  whenShouldBeStarted: {
    type: Date,
    required: false,
  },
  whenShouldBeFinished: {
    type: Date,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  isImportant: {
    type: Boolean,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  todoListId: {
    type: String,
    required: true,
  },
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

export interface ITaskDocument extends ITaskWithReadonlyProperties, Document {}

export type TaskCollectionType = mongoose.Model<ITaskDocument>;
export const getTaskCollection = () =>
  mongoose.model<ITaskDocument>(TaskCollectionName, TaskSchema);

export const mapTaskToAttachedtask = (task: ITaskDocument): ITaskAttached => {
  return {
    id: task.id,
    text: task.text,
    whenShouldBeStarted: task.whenShouldBeStarted,
    whenShouldBeFinished: task.whenShouldBeFinished,
    startDate: task.startDate,
    finishDate: task.finishDate,
    important: task.important,
    color: task.color,
    creator: task.creator,
    todoListId: task.todoListId,
    whenCreated: task.whenCreated,
    whenUpdated: task.whenUpdated,
  };
};
