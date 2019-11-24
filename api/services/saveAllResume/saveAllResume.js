const getAuthToken = require("../getAuthToken/getAuthToken");
const connectMongoDb = require("../connectMongoDb");
const parsePages = require("./parsePages");

const saveAllResume = async () => {
  const authToken = await getAuthToken();
  const options = { headers: { Cookie: authToken } };
  const client = await connectMongoDb();
  const collection = client.db("rabotaua").collection("reports");
  const responseDB = await collection.insertOne({
    startDate: new Date(),
    addedResume: 0,
    emptyPages: 0,
    resumesId: [],
    status: "executes"
  });
  const reportId = responseDB.insertedId;
  try {
    await parsePages({ reportId, options });
    collection.updateOne({ _id: reportId }, { status: "ended" });
  } catch (e) {
    collection.updateOne({ _id: reportId }, { status: "failed", error: e });
  }
};

module.exports = saveAllResume;
