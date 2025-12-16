import { Request, Response } from "express";
import { db } from "../config/db";

const getMonthRange = () => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const currentUsage = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { start, end } = getMonthRange();

    const [[subscription]]: any = await db.query(
        `SELECT plans.* FROM subscriptions
        JOIN plans ON subscriptions.planId = plans.id
        WHERE subscriptions.userId = ? AND subscriptions.isActive = true`,
        [userId]
    );

    const [[usage]]: any = await db.query(
        `SELECT SUM(usedUnits) AS total FROM usage_records
        WHERE userId = ? AND createdAt BETWEEN ? AND ?`,
        [userId, start, end]
    );

    const totalUsed = usage.total || 0;

    res.json({
        totalUsed,
        remainingUnits: subscription.monthlyQuota - totalUsed,
        plan: subscription,
    });
};

export const billingSummary = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { start, end } = getMonthRange();

    const [[plan]]: any = await db.query(
        `SELECT plans.* FROM subscriptions
        JOIN plans ON subscriptions.planId = plans.id
        WHERE subscriptions.userId = ? AND subscriptions.isActive = true`,
        [userId]
    );

    const [[usage]]: any = await db.query(
        `SELECT SUM(usedUnits) AS total FROM usage_records
        WHERE userId = ? AND createdAt BETWEEN ? AND ?`,
        [userId, start, end]
    );

    const totalUsage = usage.total || 0;
    const extraUnits = Math.max(0, totalUsage - plan.monthlyQuota);
    const extraCharges = Number(
        (extraUnits * plan.extraChargePerUnit).toFixed(2)
    );

    res.json({
        totalUsage,
        planQuota: plan.monthlyQuota,
        extraUnits,
        extraCharges,
        plan,
    });
};
