import { Router } from "express";
import { validate } from "../middlewares/validate";
import { categroyIdParamSchema, createCategorySchema, updateCategorySchema } from "../validations/category-validation";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category-controller";
import { protect } from "../middlewares/protect";

const router = Router()

router.use(protect)

router.post("/", validate(createCategorySchema), createCategory)
router.get("/", getCategories)
router.patch("/:id", validate(updateCategorySchema), updateCategory)
router.delete("/:id", validate(categroyIdParamSchema), deleteCategory)

export default router