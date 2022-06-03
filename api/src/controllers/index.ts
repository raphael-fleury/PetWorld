import { attachControllerInstances, attachControllers, Type } from "@decorators/express";
import asyncRouter from "../util/async-router"
import errorHandlers from "../middlewares/error-handling";
import fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file.includes('.controller'));

function getControllers() {
    return files.map(file => {
        const module = require(`./${file.replace('.js', '')}`)
        return module.default;
    })
}

export function getRouter(controller: Type | object) {
    const router = asyncRouter();

    if (typeof controller === 'object')
        attachControllerInstances(router, [controller])
    else
        attachControllers(router, [controller])

    errorHandlers.forEach(handler => {
        router.use(new handler().use);
    })

    return router;
}

export function getRouters() {
    return getControllers().map(getRouter);
}