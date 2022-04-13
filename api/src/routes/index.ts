import { Application, Router } from "express";
import asyncRouter from "../util/async-router"
import catchErrors from "../middlewares/catch-errors.middleware";
import useAuthentication from "../middlewares/authentication.middleware";
import fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => file.includes('.routes'));

function usePreMiddlewares(router: Router) {
    useAuthentication(router);
}

function usePostMiddlewares(router: Router) {
    catchErrors(router);
}

const useRouter = (app: Application, file: string) => {
    import(`./${file.replace('.js', '')}`).then((x) => {
        const router = asyncRouter();
        const { uri, useRoutes } = x.default;

        usePreMiddlewares(router);
        useRoutes(router);
        usePostMiddlewares(router);
        
        app.use(uri, router);
    });
}

const useRouters = (app: Application) => {
    files.forEach(file => useRouter(app, file))
    return app;
}

export { files, useRouters }