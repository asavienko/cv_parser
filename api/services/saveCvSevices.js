const connectDb = require("../database/connectMongoDb");

const createNewCvList = async ({ userId, dataToSave }) => {
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("saved");
  return collection.insertOne({
    ...dataToSave,
    userId,
    name: "",
    date: new Date().toISOString()
  });
};


// const updateCvList = async ({listId, dataToPut})=>{}


module.exports = { createNewCvList };
