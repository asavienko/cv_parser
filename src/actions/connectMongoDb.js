const MongoClient = require("mongodb").MongoClient;
const uri = require("../constants/userData").mongoDb;

const connectDb = (db, collection) => {
  console.log("connecting MongoClient");

  const client = new MongoClient.connect(uri, {
    useNewUrlParser: true
  }).catch(err => {
    console.log(err);
  });
  return client;
};

module.exports = connectDb.db("abc").collection("abc");
