const initBrowser = require("./src/actions/initBrowser");
const parseUserInformation = require("./src/actions/parseUserInformation");
const parseCvs = require("./src/actions/parseCvs");
const login = require("./src/actions/login");
const connectDb = require("./src/actions/connectMongoDb");
const connectDropBox = require("./src/actions/connectDropbox");

/*[
          14102536,
          3685144,
          12767919,
          10364860,
          14335060,
          14321276,
          14224928,
          13208220,
          9899905,
          6452994,
          14338216,
          14337569,
          9899905,
          11006966,
          14337756,
          14338128,
          12470726,
          12470726,
13892095,
13208220,
13476407,
11404044,
14337302,
11404044,
14336349,
14033542,
11404056,
13714273,
12384898

        ]*/

(async () => {
  const page = await initBrowser();
  const enteredPage = await login(page);
  // await parseCvs(enteredPage);

  // const dropBox = await connectDropBox();
  //   await dropBox
  //     .filesUpload({ path: "/cvs/cv", contents: "./actions/login.js" })
  //     .then(result => console.log(result)).catch(error => console.log(error));
  //
  // console.log(await dropBox);
//todo not usage
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  const list = await collection
    .find({
      resumeId: {
        $in: [12007210]
      }
    })
    .toArray();
  console.log(await list);

  await parseUserInformation({ enteredPage, list });
})();
