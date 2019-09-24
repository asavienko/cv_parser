const MongoClient = require("mongodb").MongoClient;
const uri = require("../constants/userData").mongoDb;

const connectDb = () => {
  const client = new MongoClient.connect(uri, {
    useNewUrlParser: true
  }).catch(err => {
    console.log(err);
  });
  return client;
};

const connectCollection = async (dbName, collectionName) => {
  const client = await connectDb();
  if (dbName) {
    return collectionName
      ? await client.db(dbName).collection(collectionName)
      : await client.db(dbName);
  }
  return client;
};

module.exports = connectCollection;
