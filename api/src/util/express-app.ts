import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export function createExpressApp() {
    const app = express();

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    return app;
}