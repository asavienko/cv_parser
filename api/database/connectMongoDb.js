const { MONGODB_URI } = process.env;
const { MongoClient } = require("mongodb");

const connectDb = async () => {
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true });
  return await client.connect();
};

module.exports = connectDb;
