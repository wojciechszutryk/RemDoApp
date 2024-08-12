import {
  ITaskAttached,
  ITaskWithReadonlyProperties,
} from "linked-models/task/task.model";
import mongoose, { Document } from "mongoose";

export const TaskCollectionName = "tasks";

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String, required: false },
  link: { type: String, required: false },
  startDate: {
    type: Date,
    required: false,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  completionDate: {
    type: Date,
    required: false,
  },
  important: {
    type: Boolean,
    required: false,
  },
  recurrance: {
    type: String,
    required: false,
  },
  todoListId: {
    type: String,
    required: false,
  },
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
});

export interface ITaskDocument extends ITaskWithReadonlyProperties, Document {}

export type TaskCollectionType = mongoose.Model<ITaskDocument>;
export const getTaskCollection = () =>
  mongoose.model<ITaskDocument>(TaskCollectionName, TaskSchema);

export const mapTaskToAttachedTask = (task: ITaskDocument): ITaskAttached => {
  return {
    id: task.id,
    text: task.text,
    description: task.description,
    link: task.link,
    startDate: task.startDate,
    finishDate: task.finishDate,
    notifyDate: task.notifyDate,
    completionDate: task.completionDate,
    important: task.important,
    creatorId: task.creatorId,
    todoListId: task.todoListId,
    whenCreated: task.whenCreated,
    whenUpdated: task.whenUpdated,
    recurrance: task.recurrance,
  };
};
