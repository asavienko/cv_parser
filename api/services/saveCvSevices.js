const { ObjectID } = require("mongodb");
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

const putNewCvToList = async ({ listId, dataToPut }) => {
  const { filters, selectedRows } = dataToPut;
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("saved");
  return collection.updateOne(
    { _id: ObjectID(listId) },
    {
      $addToSet: {
        selectedRows: { $each: selectedRows }
      },
      $set: { filters }
    }
  );
};

module.exports = { createNewCvList, putNewCvToList };
