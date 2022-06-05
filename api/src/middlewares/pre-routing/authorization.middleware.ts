import { Middleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

export class AuthorizationMiddleware implements Middleware {
    async use(req: Request, res: Response, next: NextFunction) {
        if (!req.user)
            res.status(401).send("Invalid or expired token.")

        next();
    }
}