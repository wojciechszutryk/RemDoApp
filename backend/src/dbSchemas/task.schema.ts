import mongoose from "mongoose";

export const TaskCollectionName = "tasks";

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  startDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  important: false,
  finishDate: Date,
  createdBy: String,
  color: String,
});

const Task = mongoose.model("Task", taskSchema);

export interface ITaskDocument extends INodeWithAutomaticProperties, Document {}

export const TaskCollection = mongoose.model<ITaskDocument>(
  TaskCollectionName,
  TaskSchema
);

export type NodeCollectionType = mongoose.Model<ITaskDocument>;
export const getNodeCollection = () =>
  mongoose.model<ITaskDocument>(TaskCollectionName, TaskSchema);

export const mapNodeToAttachedNode = (task: ITaskDocument): ITaskAttached => {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    sourceUrl: node.sourceUrl,
    organizationId: node.organizationId,
    status: node.status,
    lang: node.lang,
    creator: node.creator,
    weight: node.weight,
    whenCreated: node.whenCreated,
    whenUpdated: node.whenUpdated,
  };
};
