const initBrowser = require("./api/actions/initBrowser");
const parseUserInformation = require("./api/actions/parseUserInformation");
const parseCvs = require("./api/actions/parseCvs");
const login = require("./api/actions/login");
const connectDb = require("./api/actions/connectMongoDb");
const userIds = require("./api/mockData/mockData").openedCvs;
const express = require("express");
const app = express();

const client = connectDb();


const collection = client.then(obj =>
  obj.db("rabotaua").collection("cvs")
);

app.get("/", (req, res) => {
  res.send("Hello world...  ");
});

app.get("/cvlist", (req, res) => {
  const query = req.query;
  collection
    .then(collection => collection.find(query).toArray())
    .then(result => res.json({ confirmation: "success", data: result }))
    .catch(err =>
      res.json({
        confirmation: "fail",
        message: err.message
      })
    );
});
const port = 5000;
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
