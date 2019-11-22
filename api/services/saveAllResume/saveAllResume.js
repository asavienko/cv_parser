const getAuthToken = require("../getAuthToken/getAuthToken");
const countTotalCvs = require("../countTotalCvs.js");
const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const connectMongoDb = require("../connectMongoDb");
const ObjectId = require("mongodb").ObjectId;



const saveAllResume = async () => {
  const authToken = await getAuthToken();

  const fetchPromises = [];

  const totalCvs = await countTotalCvs();
  const totalPages = Math.ceil(totalCvs / 12);
  for (let i = 1; i <= totalPages; i++) {
    const options = { headers: { Cookie: authToken } };
    const url = `https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20&pg=${i}`;
    const promise = new Promise((resolve, reject) => {
      const response = fetch(url, options);
      resolve(response);
    });
    fetchPromises.push(promise);
  }

  const client = await connectMongoDb();
  const collection = client.db("rabotaua").collection("reports");
  const response = await collection.insertOne({
    startDate: new Date(),
    addedResume: 0,
    emptyPages: 0,
    resumesId: [],
    status: "executes"
  });
  const reportId = response.insertedId;

  Promise.all(fetchPromises)
    .then(response => response.json())
    .then(json => saveToDb(json.Documents))
    .then(({ emptyPages = 0, insertedCount = 0, insertedIds = [] }) => {
      collection.updateOne(
        { _id: reportId },
        {
          $inc: { addedResume: insertedCount, emptyPages },
          $push: { insertedIds: { $each: insertedIds } }
        }
      );
    })
    .catch(e => {
      collection.updateOne({ _id: reportId }, { $push: { errors: e } });
    });
};

module.exports = saveAllResume;
