import schemas from "./entities/schemas";
import express from "express";
import mongo from "./mongo";

const port = process.env.PORT || 3000;
const app = express();

mongo.connect().then(() =>
    console.log("Connected to Mongo at " + mongo.uri)
);

app.get('/', async (req, res) => {
    res.send(await schemas.user.find());
})

app.listen(port, () => console.log('Listening on port ' + port));