import { catchAsync } from "../utils/catch-async";
import express from "express";
import * as activityService from "../services/activity-service";

export const getActivityHeatMap = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const days = req.query.days ? Number(req.query.days) : 90;

    const heatmap = await activityService.getActiviyHeatMap(req.userId!, days);

    res.status(200).json({
      success: true,
      data: { heatmap },
    });
  },
);
