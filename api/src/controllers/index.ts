import asyncRouter from "../util/async-router"
import { usePreMiddlewares, usePostMiddlewares } from "../middlewares";
import { UserController } from "./user.controller";
import { AuthController } from "./auth.controller";
import { attachControllers } from "@decorators/express";

const controllers = [
    UserController,
    AuthController
]

export function getRouter(controller) {
    const router = asyncRouter();

    usePreMiddlewares(router);
    attachControllers(router, [controller])
    usePostMiddlewares(router);

    return router;
}

export function getRouters() {
    return controllers.map(getRouter);
}