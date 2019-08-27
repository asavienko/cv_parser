const initBrowser = require("./api/actions/initBrowser");
const parseUserInformation = require("./api/actions/parseUserInformation");
const parseCvs = require("./api/actions/parseCvs");
const login = require("./api/actions/login");
const connectDb = require("./api/actions/connectMongoDb");
const userIds = require("./api/mockData/mockData").openedCvs;
const express = require("express");
const countFoundCvs = require("./api/actions/countFoundCvs");
const getAuthCookie = require("./api/actions/getAuthCookie");

const app = express();
app.use(express.json());

const client = connectDb();

const collection = client.then(obj => obj.db("rabotaua"));

const port = 5000;

app.get("/cvlist", (req, res) => {
  const query = req.query;
  collection
    .then(collection =>
      collection
        .collection("cvs")
        .find(query)
        .toArray()
    )
    .then(result => res.json({ confirmation: "success", data: result }))
    .catch(err =>
      res.json({
        confirmation: "fail",
        message: err.message
      })
    );
});
app.get("/dictionary_city", (req, res) => {
  collection
    .then(collection =>
      collection
        .collection("dictionaryCity")
        .find()
        .toArray()
    )
    .then(result => res.json({ confirmation: "success", data: result }))
    .catch(err =>
      res.json({
        confirmation: "fail",
        message: err.message
      })
    );
});

app.post("/cv_preparse", async (req, res) => {
  const request = req.body;
  console.log(request);
  const page = await initBrowser();
  const enteredPage = await login(page);
  const cookie = await getAuthCookie( enteredPage );
  console.log(cookie);
  const foundCvs = await countFoundCvs({ page: enteredPage, request });
  // await enteredPage.close();
  console.log(foundCvs);
  res.json({ foundCvs });
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
