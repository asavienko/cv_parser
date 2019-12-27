const MONGODB_URI = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;

const connectDb = async () => {
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true });
  return await client.connect();
};

module.exports = connectDb;
