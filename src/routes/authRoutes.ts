import express from "express";
import { errorHandler } from "../middlewares/errorHandler";
import {validateUserRegistration} from "../middlewares/userValidator";
import {login, register} from "../controllers/userController";


const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: fpetrungaro
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/register", validateUserRegistration, register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user and return a JWT token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: fpetrungaro
 *               password:
 *                 type: string
 *                 example: strongpassword
 *     responses:
 *       200:
 *         description: Successfully logged in, returns JWT token
 *       401:
 *         description: Unauthorized. Invalid credentials
 *       500:
 *         description: Internal server error
 */

router.post("/login",  login)


router.use(errorHandler)
export default router;

