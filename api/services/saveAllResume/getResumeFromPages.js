const getAuthToken = require("../getAuthToken/getAuthToken");
const connectMongoDb = require("../../database/connectMongoDb");
const parsePages = require("./parsePages");

const getResumeFromPages = async () => {
  const authToken = await getAuthToken();
  const options = { headers: { Cookie: authToken } };
  const client = await connectMongoDb();
  const collectionResumes = client.db("rabotaua").collection("resumes");
  const collectionReports = client.db("rabotaua").collection("reports");

  const responseDB = await collectionReports.insertOne({
    name: "Parse all resume",
    startDate: new Date(),
    status: "started"
  });
  const reportId = responseDB.insertedId;
  try {
    parsePages({
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

module.exports = getResumeFromPages;
