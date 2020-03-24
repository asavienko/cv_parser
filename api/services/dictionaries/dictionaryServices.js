const connectDb = require("../../database/connectMongoDb");

const getCities = async () => {
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("dictionaryCity");
  const result = await collection.find().toArray();
  if (!result.length) throw Error("There are any city in data base");
  return result;
};

module.exports = { getCities };
