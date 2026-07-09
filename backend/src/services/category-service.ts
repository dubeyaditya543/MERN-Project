import { Category } from "../models/Category";
import { ApiError } from "../utils/api-error";

interface CategoryInput {
  name: string;
  color: string;
}

export async function createCategory(userId: string, input: CategoryInput) {
  return Category.create({
    name: input.name,
    color: input.color,
    owner: userId,
  });
}

export async function getCategories(userId: string) {
  return Category.find({ owner: userId }).sort({ name: 1 });
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  input: Partial<CategoryInput>,
) {
  const category = await Category.findOneAndUpdate(
    { _id: categoryId, owner: userId },
    input,
    { new: true, runValidators: true },
  );

  if(!category){
    throw new ApiError(404, "Category not found")
  }

  return category
}

export async function deleteCategory(userId: string, categoryId: string){
  const category = await Category.findOneAndDelete({owner: userId, _id: categoryId})
  if(!category){
    throw new ApiError(404, "Category not found")
  } 
}
