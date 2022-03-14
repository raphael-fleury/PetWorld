import { Application } from "express";
import fs = require('fs');

const files = fs.readdirSync(__dirname).filter(file => !file.includes('index'));

const useRoute = (app: Application, file: string) => {
    import(`./${file.replace('.js', '')}`).then((x) => x.default(app));
}

const useRoutes = (app: Application) => {
    files.forEach(file => useRoute(app, file))
    return app;
}

export { files, useRoutes }