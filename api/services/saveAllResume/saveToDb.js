const connectMongoDb = require("../connectMongoDb");

const saveToDb = async data => {
  const client = await connectMongoDb();
  const collection = client.db("rabotaua").collection("resumes");

  if (data.length) {
    const response = await collection.insertMany(data, {
      ordered: false
    });
    const insertedIds = Object.values(response.insertedIds);
    const report = {
      insertedCount: response.insertedCount,
      insertedIds,
      emptyPages: 0
    };
    client.close();
    return report;
  }
  client.close();
  return { emptyPages: 1 };
};

module.exports = saveToDb;
