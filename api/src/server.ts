import express from "express";
import bodyParser from "body-parser";
import { useRouters } from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

useRouters(app);

export default app;