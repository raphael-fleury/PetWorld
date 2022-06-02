import { ErrorMiddleware } from "@decorators/express";
import { NextFunction, Request, Response } from "express";

function treatValidationError(error) {
    const errors: any[] = [];

    Object.keys(error.errors).forEach(key => {
        errors.push(error.errors[key].properties);
    })

    return errors;
}

export class ValidationErrorHandler implements ErrorMiddleware {
    async use(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error.name === "ValidationError")
            return res.status(400).send(treatValidationError(error));

        next();
    }
}