import { Router } from "express";
import { recordUsage } from "../controllers/usage.controller";

const router = Router();
router.post("/", recordUsage);

export default router;
