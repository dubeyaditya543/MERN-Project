import mongoose from "mongoose"
import { Activity } from "../models/Activity"

export async function getActiviyHeatMap(userId: string, days = 90) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  return Activity.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        createdAt: {$gte: startDate}
      }
    },
    {
      $group: {
        _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
        count: {$sum: 1}
      }
    },
    {
      $sort: {_id: 1}
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        count: 1
      }
    }
  ])
}