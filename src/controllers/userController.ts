import {NextFunction, Request, Response} from "express";
import {UserService} from "../services/userService";

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  const result = await userService.register(req.body.username, req.body.password);
  res.status(201).json(result);
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.login(req.body.username, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}