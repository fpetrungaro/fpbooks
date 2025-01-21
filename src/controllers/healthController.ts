import {Request, Response} from "express";
import {HealthService} from "../services/healthService";
import logger from "../utils/logger";

const healthService = new HealthService();

export let isHealthy = async (req: Request, res: Response) => {
  logger.debug("health check")
  const healthyResponse = await healthService.isHealthy();
  if (!healthyResponse) {
    res.send("<h1 style='font-size: 30px; color: red;'>Database is not healthy!</h1>");
  } else {
    res.send("<h1 style='font-size: 30px;'>Server and database are running and healthy!</h1>");
  }
};