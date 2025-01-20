import express from "express";
import {isHealthy} from "../controllers/healthController";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Health check
 *       500:
 *          description: db error
 */
router.get("/", isHealthy);

export default router;
