import { db } from "../config/db";
import { users } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {eq} from "drizzle-orm";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export class UserService {
  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ username, password: hashedPassword }).execute();
    return { message: "User registered" };
  }

  async login(username: string, password: string) {
    const user = await db.select().from(users).
    where(eq(users.username, username)).execute().then(users => users[0]);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    return { token };
  }
}
