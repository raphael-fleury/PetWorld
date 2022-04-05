import catchErrors from "../middlewares/catch-errors";
import { Application } from "express";
import fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => !file.includes('index'));

const useRoute = (app: Application, file: string) => {
    import(`./${file.replace('.js', '')}`).then((x) => {
        const { uri, router } = x.default;

        catchErrors(router);
        app.use(uri, router);
    });
}

const useRoutes = (app: Application) => {
    files.forEach(file => useRoute(app, file))
    return app;
}

export { files, useRoutes }