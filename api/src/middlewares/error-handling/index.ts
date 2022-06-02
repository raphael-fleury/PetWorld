import { CastErrorHandler } from "./cast-error.middleware";
import { DuplicateKeyErrorHandler } from "./duplicate-key-error.middleware";
import { NotFoundErrorHandler } from "./not-found-error.middleware";
import { UnknownErrorHandler } from "./unknown-error.middleware";
import { ValidationErrorHandler } from "./validation-error.middleware";

export default [
    CastErrorHandler,
    DuplicateKeyErrorHandler,
    NotFoundErrorHandler,
    ValidationErrorHandler,
    UnknownErrorHandler //needs to be the last one
]