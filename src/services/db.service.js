require('dotenv').config();
const connectionString = process.env.ATLAS_URI;
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;