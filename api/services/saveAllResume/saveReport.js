const connectMongoDb = require("../connectMongoDb");

const saveReportToDb = async (
  { emptyPages = 0, insertedCount = 0, insertedIds = [] },
  reportId
) => {
  const client = await connectMongoDb();
  const collection = client.db("rabotaua").collection("reports");
  console.log(insertedCount);
  collection.updateOne(
    { _id: reportId },
    {
      $inc: { addedResume: insertedCount, emptyPages },
      $push: { insertedIds: { $each: insertedIds } }
    }
  );
  client.close();
  return emptyPages ? { status: "finishing" } : { status: "executes" };
};

module.exports = saveReportToDb;
