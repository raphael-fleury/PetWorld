import { Middleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import tokenService from "../../services/token.service";

export class AuthenticationMiddleware implements Middleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies["api-token"] ?? "";

        if (!tokenService.isTokenExpired(token)) {
            req.user = await tokenService.getUserFromToken(token);
        }
        
        next();
    }
}