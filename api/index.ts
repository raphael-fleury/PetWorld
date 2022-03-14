import express from "express";
import bodyParser from "body-parser";
import schemas from "./entities/schemas";
import mongo from "./mongo";

const port = process.env.PORT || 3000;
const app = express();

mongo.connect().then(() =>
    console.log("Connected to Mongo at " + mongo.uri)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello world.');
})

app.post('/users', async (req, res) => {
    try {
        const user = await schemas.user.create(req.body);
        res.status(200).send(user);
    }
    catch (error: any) {
        res.status(500).send(error.message);
    }
})

app.listen(port, () => console.log('Listening on port ' + port));