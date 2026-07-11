import { Router } from "express";
import { protect } from "../middlewares/protect";
import { getActivityHeatMap } from "../controllers/activity-controller";

const router = Router()

router.use(protect)

router.get("/heatmap", getActivityHeatMap)

export default router