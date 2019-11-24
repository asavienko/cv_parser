const getAuthToken = require("../getAuthToken/getAuthToken");
const connectMongoDb = require("../connectMongoDb");
const parsePages = require("./parsePages");

const saveAllResume = async () => {
  const authToken = await getAuthToken();
  const options = { headers: { Cookie: authToken } };
  const client = await connectMongoDb();
  const collectionResumes = client.db("rabotaua").collection("resumes");
  const collectionReports = client.db("rabotaua").collection("reports");

  const responseDB = await collectionReports.insertOne({
    startDate: new Date(),
    addedResume: 0,
    emptyPages: 0,
    resumesId: [],
    status: "started"
  });
  const reportId = responseDB.insertedId;
  try {
    await parsePages({
      reportId,
      options,
      collectionReports,
      collectionResumes
    });
    collectionReports.updateOne(
      { _id: reportId },
      { $set: { status: "ended" } }
    );
  } catch (e) {
    collectionReports.updateOne(
      { _id: reportId },
      { $set: { status: "failed", error: e } }
    );
  }
};

module.exports = saveAllResume;
