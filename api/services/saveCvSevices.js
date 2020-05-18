const connectDb = require("../database/connectMongoDb");

const saveCvToDb = async ({ userId, dataToSave }) => {
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("saved");
  return collection.insertOne({
    ...dataToSave,
    userId,
    name: "",
    date: new Date().toISOString()
  });
};

module.exports = { saveCvToDb };
