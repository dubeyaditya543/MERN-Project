import mongoose, { Model, Schema } from "mongoose";

export interface ICategory {
  name: string;
  color: string;
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type CategoryModel = Model<ICategory>;

export const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxLength: [30, "Category name cannot exceed 30 chars"],
    },
    color: {
      type: String,
      trim: true,
      required: [true, "Color is required"],
      match: [/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

categorySchema.index({owner: 1, name: 1}, {unique: true})

export const Category = mongoose.model<ICategory, CategoryModel>("Category", categorySchema)