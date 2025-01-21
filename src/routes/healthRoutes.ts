import express from "express";
import {isHealthy} from "../controllers/healthController";

const router = express.Router();


router.get("/", isHealthy);

export default router;
