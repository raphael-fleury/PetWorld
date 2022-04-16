import { Application } from "express";
import { usePreMiddlewares, usePostMiddlewares } from "../middlewares";
import asyncRouter from "../util/async-router"
import fs = require('fs');

export type Controller = {
    uri: string,
    useRoutes: (Router) => void;
}

export const files = fs.readdirSync(__dirname).filter(file => file.includes('.controller'));

async function getController(file: string) {
    const module = await import(`./${file.replace('.js', '')}`);
    return module.default as Controller;
}

export const useControllers = (app: Application) => {
    files.forEach(file => {
        getController(file).then(({ uri, useRoutes }) => {
            const router = asyncRouter();
    
            usePreMiddlewares(router);
            useRoutes(router);
            usePostMiddlewares(router);
            
            app.use(uri, router);
        })
    })
}