import express from "express";
import { UserService } from "../services/userService";

const router = express.Router();
const userService = new UserService();

router.post("/register", async (req, res) => {
  try {
    const result = await userService.register(req.body.username, req.body.password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: (err as any).message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userService.login(req.body.username, req.body.password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: (err as any).message });
  }
});

export default router;

