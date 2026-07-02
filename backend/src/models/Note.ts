import mongoose, { Model, Schema } from "mongoose";

export interface INote {
  title: string;
  content: string;
  owner: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

type NoteModel = Model<INote>;

export const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is must"],
      trim: true,
      minLength: [150, "Title cannot exceed 150 chars"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      match: [/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code"],
    },
  },
  { timestamps: true },
);

noteSchema.index({owner: 1, isPinned: -1, updatedAt: -1})
noteSchema.index({owner: 1, isArchived: 1})
noteSchema.index({title: "text", content: "text"})

export const Note = mongoose.model<INote, NoteModel>("Note", noteSchema)
