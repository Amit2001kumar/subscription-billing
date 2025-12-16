import { Request, Response } from "express";
import { db } from "../config/db";

export const recordUsage = async (req: Request, res: Response) => {
  const { userId, action, usedUnits } = req.body;

  await db.query(
    "INSERT INTO usage_records (userId, action, usedUnits) VALUES (?, ?, ?)",
    [userId, action, usedUnits]
  );

  res.json({ message: "Usage recorded successfully" });
};
