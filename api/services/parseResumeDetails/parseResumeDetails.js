const getAuthToken = require("../getAuthToken/getAuthToken");
const connectMongoDb = require("../connectMongoDb");
const parseInformation = require("./parseDetails");

const parseResumeDetails = async () => {
  const authToken = await getAuthToken();
  const options = { headers: { Cookie: authToken } };
  const client = await connectMongoDb();
  const collectionResumes = client.db("rabotaua").collection("resumeIds");
  const collectionReports = client.db("rabotaua").collection("reports");
  const responseDB = await collectionReports.insertOne({
    name: "Parse resumeId information",
    startDate: new Date(),
    status: "started"
  });
  const reportId = responseDB.insertedId;
  try {
    parseInformation({
      reportId,
      options,
      collectionReports,
      collectionResumes
    });
  } catch (e) {
    collectionReports.updateOne(
      { _id: reportId },
      { $set: { status: "failed", error: e.message, endDate: new Date() } }
    );
    return { message: e.message };
  }
  return { message: "Successfully started" };
};

module.exports = parseResumeDetails;
