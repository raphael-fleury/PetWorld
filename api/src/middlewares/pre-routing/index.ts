import { AuthenticationMiddleware } from "./authentication.middleware";
import { AuthorizationMiddleware } from "./authorization.middleware";

export default [
    AuthenticationMiddleware,
    AuthorizationMiddleware
]