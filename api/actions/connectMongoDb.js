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

const connectCollection = async (dbName, collectName) => {
  if (dbName && collectName) {
    const client = await connectDb();
    const collection = await client.db(dbName).collection(collectName);
    return collection;
  } else if (dbName) {
    const client = await connectDb();
    const db = await client.db(dbName);
    return db;
  }
  return await connectDb();
};

module.exports = connectCollection;
