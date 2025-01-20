import {Request, Response} from "express";
import {BookService} from "../services/bookService";
import {HealthService} from "../services/healthService";

const healthService = new HealthService();

export let isHealthy = async (req: Request, res: Response) => {
  console.log("health check")
  const healthyResponse = healthService.isHealthy();
  if (!healthyResponse) {
    res.send("<h1 style='font-size: 30px; color: red;'>Database is not healthy!</h1>");
  } else {
    res.send("<h1 style='font-size: 30px;'>Server and database are running and healthy!</h1>");
  }
};