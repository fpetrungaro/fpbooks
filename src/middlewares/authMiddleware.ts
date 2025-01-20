import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { [key: string]: any };
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};