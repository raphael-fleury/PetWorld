import express from "express";
import mongo from "./mongo";

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
})

mongo.connect().then(() =>
    console.log("Connected to Mongo at " + mongo.uri)
);

app.listen(port, () => console.log('Listening on port ' + port));