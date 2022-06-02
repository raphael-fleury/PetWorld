import { ErrorMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

export class CastErrorHandler implements ErrorMiddleware {
    async use(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error.name === "CastError")
            return res.status(404).send('Resource not found.');

        next();
    }
}