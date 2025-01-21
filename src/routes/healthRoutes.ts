import express from "express";
import {isHealthy} from "../controllers/healthController";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check API health status
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: App is healthy
 *       500:
 *         description: App is down
 */
router.get("/", isHealthy);

export default router;
