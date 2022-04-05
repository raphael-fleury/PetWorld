import app from "./src/server";
import mongo from "./src/mongo";

const port = process.env.PORT || 3000;

mongo.connect().then(() =>
    console.log("Connected to Mongo at " + mongo.uri)
).catch((error) =>
    console.error("Error on connecting to Mongo\n" + error.message)
);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log('Listening on port ' + port));
}

export default app;