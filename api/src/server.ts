import express from "express";
import bodyParser from "body-parser";
import { useControllers } from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

useControllers(app);

export default app;