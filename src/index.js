const initBrowser = require("./actions/initBrowser");
const parseUserInformation = require("./actions/parseUserInformation");
const parseCvs = require("./actions/parseCvs");
const login = require("./actions/login");
const connectDb = require("./actions/connectMongoDb");

//
// , 3685144, 10364860, 12767919, 14335060
(async () => {
  const page = await initBrowser();
  const enteredPage = await login(page);
  // await parseCvs(enteredPage);

  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  const list = await collection
    .find({
      ResumeId: { $in: [14102536] }
    }).toArray();
  console.log(await list);

  await parseUserInformation(enteredPage, list)
})();
