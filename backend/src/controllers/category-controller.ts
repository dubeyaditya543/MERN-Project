import { catchAsync } from "../utils/catch-async";
import express from "express"
import * as categoryService from "../services/category-service"

export const createCategory = catchAsync(async (req: express.Request, res: express.Response) => {
  const category = await categoryService.createCategory(req.userId!, req.body)

  res.status(201).json({
    success: true,
    data: {category}
  })
})

export const getCategories = catchAsync(async (req: express.Request, res: express.Response) => {
  const categories = await categoryService.getCategories(req.userId!)

  res.status(200).json({
    success: true,
    data: {categories}
  })
})

export const updateCategory = catchAsync(async (req: express.Request, res: express.Response) => {
  const updatedCategory = await categoryService.updateCategory(req.userId!, req.params.id as string, req.body)

  res.status(200).json({
    success: true,
    data: {updatedCategory}
  })
})

export const deleteCategory = catchAsync(async (req: express.Request, res: express.Response) => {
  await categoryService.deleteCategory(req.userId!, req.params.id as string)
  res.status(204).send()
})