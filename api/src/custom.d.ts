import User from "../entities/user";
import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}