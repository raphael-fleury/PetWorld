import { ErrorMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

function treatDuplicateKeyError(error) {
    const path = Object.keys(error.keyValue)[0];
    const value = error.keyValue[path];
    const message = error.message;

    return [{ path, value, message }]
}

export class DuplicateKeyErrorHandler implements ErrorMiddleware {
    async use(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error['code'] = 11000)
            return res.status(409).send(treatDuplicateKeyError(error));

        next();
    }
}