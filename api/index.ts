import express from "express";
import bodyParser from "body-parser";
import mongo from "./mongo";

import { useRoutes } from "./routes";

const port = process.env.PORT || 3000;
const app = express();

mongo.connect().then(() =>
    console.log("Connected to Mongo at " + mongo.uri)
).catch((error) =>
    console.error("Error on connecting to Mongo\n" + error.message)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

useRoutes(app);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log('Listening on port ' + port));
}

export default app;