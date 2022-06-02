import { ErrorMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

export class UnknownErrorHandler implements ErrorMiddleware {
    async use(error: Error, req: Request, res: Response, next: NextFunction) {
        console.error(error.stack);
        res.status(500).send(error.message);
    }
}