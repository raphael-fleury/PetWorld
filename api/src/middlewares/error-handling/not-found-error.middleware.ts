import { ErrorMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";
import NotFoundError from "../../services/errors/not-found.error";

export class NotFoundErrorHandler implements ErrorMiddleware {
    async use(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof NotFoundError)
            return res.status(404).send(error.message);

        next();
    }
}