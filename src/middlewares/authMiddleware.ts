import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const SECRET_KEY = process.env.JWT_SECRET || "fpetrungaro_secret";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  logger.debug("calling authentication middleware");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    (req as any).user = jwt.verify(token, SECRET_KEY) as { [key: string]: any };
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
  logger.debug("token verified");
};