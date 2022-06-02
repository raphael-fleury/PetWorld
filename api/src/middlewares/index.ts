import { AuthenticationMiddleware } from "./authentication.middleware";
import { ErrorCatchingMiddleware } from "./catch-errors.middleware";

export const middlewares = [
    AuthenticationMiddleware
]

export const errorMiddlewares = [
    ErrorCatchingMiddleware
]