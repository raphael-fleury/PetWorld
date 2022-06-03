import preRouting from "./pre-routing";
import errorHandling from "./error-handling";

export const preRoutingMiddlewares = preRouting
export const errorHandlers = errorHandling

export default [
    ...preRoutingMiddlewares,
    ...errorHandlers
]