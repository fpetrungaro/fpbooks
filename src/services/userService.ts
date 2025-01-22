import { db } from "../config/db";
import { users } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";

const SECRET_KEY = process.env.JWT_SECRET || "fpetrungaro_secret";

export class UserService {
  async register(username: string, password: string) {
    logger.debug("Registering user", username);
    // Check if the user already exists
    const existingUser = await db.select().from(users).where(eq(users.username, username)).execute();

    if (existingUser.length > 0) {
      logger.debug(`User "${username}" already exists. Skipping registration.`);
      return { message: "User already exists" };
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ username, password: hashedPassword }).execute();
    return { message: "User registered" };
  }

  async login(username: string, password: string) {
    const user = await db.select().from(users).where(eq(users.username, username)).execute();
    if (!user || user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
      throw {status: 401, message: "Invalid credentials"};
    }

    const token = jwt.sign({ id: user[0].id, username: user[0].username }, SECRET_KEY, { expiresIn: "4h" });
    return { token };
  }
}
