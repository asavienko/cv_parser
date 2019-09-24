const initBrowser = require("./api/actions/initBrowser");
const parseUserInformation = require("./api/actions/parseUserInformation");
const parseCvs = require("./api/actions/parseCvs");
const login = require("./api/actions/login");
const connectCollection = require("./api/actions/connectMongoDb");
const userIds = require("./api/mockData/mockData").openedCvs;
const express = require("express");
const getTotalCvs = require("./api/actions/getTotalCvs");
const getAuthToken = require("./api/actions/getAuthToken");
const query = require("querystring");

const app = express();
app.use(express.json());

const port = 5000;

app.get("/cvlist", async (req, res) => {
  const query = req.query;
  try {
    const collection = await connectCollection("rabotaua", "cvs");
    const result = await collection.find(query).toArray();
    res.json({ confirmation: "success", data: result });
  } catch (err) {
    res.json({
      confirmation: "fail",
      message: err.message
    });
  }
});
app.get("/dictionary-city", async (req, res) => {
  //todo up to date data from api
  try {
    const collection = await connectCollection("rabotaua", "dictionaryCity");
    const result = await collection.find().toArray();
    res.json({ confirmation: "success", data: result });
  } catch (e) {
    res.json({
      confirmation: "fail",
      message: e.message
    });
  }
});
app.get("/total-cvs", async (req, res) => {
  const page = await initBrowser();
  const enteredPage = await login(page);
  const token = await getAuthToken(enteredPage);
  await enteredPage.close();
  const queryString = query.stringify(req.query);
  const foundCvs = await getTotalCvs({ token, queryString });
  res.json({ confirmation: "success", data: foundCvs });
});
app.get("/parse-cvs", async (req, res) => {
  res.json({ confirmation: "success", minutes: 134 });
});
app.listen(port, () => console.log(`Listening on port ${port}...`));

/*

  const page = await initBrowser();
  const enteredPage = await login(page);
  // await parseCvs(enteredPage);

  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  const list = await collection.find({ resumeId: {$exists: true} }).toArray();
  console.log(list);

  await parseUserInformation({ enteredPage, list });

*/
