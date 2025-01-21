import express from "express";
import { errorHandler } from "../middlewares/errorHandler";
import {validateUserRegistration} from "../middlewares/userValidator";
import {login, register} from "../controllers/userController";


const router = express.Router();

router.post("/register", validateUserRegistration, register);
router.post("/login",  login)


router.use(errorHandler)
export default router;

