const initBrowser = require("./api/actions/initBrowser");
const parseUserInformation = require("./api/actions/parseUserInformation");
const parseCvs = require("./api/actions/parseCvs");
const login = require("./api/actions/login");
const connectDb = require("./api/actions/connectMongoDb");
const connectDropBox = require("./api/actions/connectDropbox");
const userIds = require("./api/mokData/mokData").openedCvs;

const start = async () => {
  /*try {


  const dropBox = await connectDropBox();
  const path_lower = await dropBox.filesGetTemporaryUploadLink({commit_info:{
    path: "/cvs/cvtext1.txt",
  }});
  console.log(path_lower)
  } catch (e) {
    console.log(e)
  }
  try {
    const {url} = await dropBox.sharingCreateSharedLinkWithSettings({
      path: result.path_lower
    });
    console.log(url)
  } catch (e) {
    console.log(e);
    const links = await dropBox.sharingGetSharedLinks({
      path: path_lower
    });
    const  {url}  = links.links.find(item => item.path === path_lower);
    console.log(url)
  }*/

  /*
    const dropBox = await connectDropBox();
    const result = await dropBox.filesUpload({
      path: "/cvs/cvtext2.txt",
      contents: "./actions/login.js"
    });
    let link = null;
    try {
    } catch (e) {
      console.log(e);
      link = await dropBox.sharingGetSharedLinks({
        path: result.path_lower,
        direct_only: true
      });
    } finally {
      console.log(link);
    }


    */


   const page = await initBrowser();
  const enteredPage = await login(page);
  // await parseCvs(enteredPage);

const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  const list = await collection
    .find({
      resumeId: {
        $in: [...userIds]
      }
    })
    .toArray();
  console.log(await list);

 await parseUserInformation({ enteredPage, list });
};

start();
