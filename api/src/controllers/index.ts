import asyncRouter from "../util/async-router"
import { UserController } from "./user.controller";
import { AuthController } from "./auth.controller";
import { attachControllers, Type } from "@decorators/express";
import errorHandlers from "../middlewares/error-handling";

const controllers = [
    UserController,
    AuthController
]

export function getRouter(controller: Type) {
    const router = asyncRouter();
    attachControllers(router, [controller])

    errorHandlers.forEach(handler => {
        router.use(new handler().use);
    })

    return router;
}

export function getRouters() {
    return controllers.map(getRouter);
}