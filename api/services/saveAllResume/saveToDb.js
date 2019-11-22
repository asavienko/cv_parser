const connectMongoDb = require("../connectMongoDb");

const saveToDb = async data => {
  if (data.length) {
    const client = await connectMongoDb();
    const collection = client.db("rabotaua").collection("resumes");
    const response = await collection.insertMany(data, {
      ordered: false
    });
    const insertedIds = Object.values(response.insertedIds);
    const report = { insertedCount: response.insertedCount, insertedIds };
    console.log(report);
    return report;
  }
  return { emptyPages: 1 };
};

module.exports = saveToDb;
