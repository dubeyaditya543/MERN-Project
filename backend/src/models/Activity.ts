import mongoose, { Model, Schema } from "mongoose";

export type ActivityAction =
  | "created"
  | "updated"
  | "archived"
  | "unarchived"
  | "pinned"
  | "unpinned"
  | "deleted";

export interface IActivity {
  user: mongoose.Types.ObjectId;
  note: mongoose.Types.ObjectId;
  action: ActivityAction;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

type ActivityModel = Model<IActivity>;

export const activitySchema = new Schema<IActivity, ActivityModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",
    required: true,
  },
  action: {
    type: String,
    enum: [
      "created",
      "updated",
      "archived",
      "unarchived",
      "pinned",
      "unpinned",
      "deleted",
    ],
    required: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
}, {timestamps: {createdAt: true, updatedAt: false}});

activitySchema.index({user: 1, createdAt: -1})
activitySchema.index({note: 1, createdAt: -1})

export const Activity = mongoose.model<IActivity, ActivityModel>("Activity", activitySchema)