import {
  ICollaborationAttached,
  ICollaborationWithReadonlyProperties,
} from "linked-models/collaboration/collaboration.model";
import mongoose, { Document } from "mongoose";

export const CollaborationCollectionName = "Collaborations";

const CollaborationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  state: { type: String, required: true },
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

export interface ICollaborationDocument
  extends ICollaborationWithReadonlyProperties,
    Document {}

export type CollaborationCollectionType =
  mongoose.Model<ICollaborationDocument>;
export const getCollaborationCollection = () =>
  mongoose.model<ICollaborationDocument>(
    CollaborationCollectionName,
    CollaborationSchema
  );

export const mapCollaborationToAttachedCollaboration = (
  collaboration: ICollaborationDocument
): ICollaborationAttached => {
  return {
    id: collaboration.id,
    userId: collaboration.userId,
    state: collaboration.state,
    creatorId: collaboration.creatorId,
    whenUpdated: collaboration.whenUpdated,
    whenCreated: collaboration.whenCreated,
  };
};
