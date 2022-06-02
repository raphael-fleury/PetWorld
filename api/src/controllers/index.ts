import asyncRouter from "../util/async-router"
import { UserController } from "./user.controller";
import { AuthController } from "./auth.controller";
import { attachControllers, Type } from "@decorators/express";
import { errorMiddlewares } from "../middlewares";

const controllers = [
    UserController,
    AuthController
]

export function getRouter(controller: Type) {
    const router = asyncRouter();
    attachControllers(router, [controller])

    errorMiddlewares.forEach(mid => {
        router.use(new mid().use);
    })

    return router;
}

export function getRouters() {
    return controllers.map(getRouter);
}