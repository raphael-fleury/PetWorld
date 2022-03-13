const mongoose = require('mongoose');

const url = process.env.MONGO_URL || "localhost";
const port = process.env.MONGO_PORT || "27017";
const dbName = process.env.MONGO_DB_NAME || "cartola";

const uri = `mongodb://${url}:${port}/${dbName}`;

async function connect() {
    return mongoose.connect(uri);
}

export default { uri, connect };