const connectDb = require("./connectMongoDb");

const openContactsSelector =
  'div[id*="ctl00_centerZone_BriefResume1_CvView1_cvHeader_plhBuyResume"] a.btn-primary-new';

const checkResponse = ({ response, resumeId }) =>
  response.request().resourceType() === "xhr" &&
  response.request().url() ===
    `https://employer-api.rabota.ua/resume/${resumeId}` &&
  response.request().method() === "GET" &&
  response.status() === 200;

const parseCvResponse = async ({ collection, resumeId, response }) => {
  const responseObject = await response.json();
  console.log(responseObject);
  const {
    additionals,
    addDate,
    birthDate,
    educations,
    email,
    name,
    salaryFull,
    skills,
    surname
  } = responseObject;
  const phone =
    (responseObject.phone && responseObject.phone.match(/\+*\d+/gm).join("")) ||
    "";
  const data = {
    additionals,
    addDate,
    birthDate,
    educations,
    email,
    name,
    phone,
    salaryFull,
    skills,
    surname,
    lastModified: new Date()
  };
  if (phone || email) {
    console.log(phone || email);
    await collection.updateOne({ resumeId }, { $set: data });
  }
};

const evaluateResponse = async ({ target, collection, resumeId }) => {
  console.log("waiting for response");
  const response = await target.waitForResponse(response => {
    return checkResponse({ response, resumeId });
  });
  await parseCvResponse({ collection, resumeId, response });
};

const getUserInformation = async ({
  page,
  collection,
  cv: { url, resumeId }
}) => {
  if (url) {
    console.log("starting parse information");
    const context = page.browserContext();
    const target = await context.newPage();

    target.on("response", async response => {
      (await checkResponse({ response, resumeId })) &&
        parseCvResponse({
          collection,
          resumeId,
          response
        });
    });

    console.log("going to url: " + url);
    await target.goto(url);
    try {
      console.log("waiting for button");
      await target.waitFor(openContactsSelector);
      await target.click(openContactsSelector);
      console.log("button clicked");
      await evaluateResponse({ target, collection, resumeId });
    } catch (e) {
      console.log("user information has been already opened", e.message);
    } finally {
      console.log("closing page");
      await target.close();
    }
  }
};

const multiFlowParse = async ({ page, collection, list }) => {
  const wait = ms => new Promise((r, j) => setTimeout(r, ms));
  const maxFlows = 8;
  let flowsCounter = 0;
  let amountCv = 0
  async function loopArray({ page, collection, cv }) {
    while (flowsCounter >= maxFlows) {
      await wait(5000);
    }
    flowsCounter++;
    console.log("flows: " + flowsCounter);

    try {
      await getUserInformation({ page, collection, cv });
      console.log("amountCv:" + (++amountCv))
      flowsCounter--;
      return "successful";
    } catch (e) {
      flowsCounter--;
      return e.name;
    }
  }
  let promises = [];
  for (let i = 0; i < list.length; i++) {
    await wait(2000);
    promises.push(loopArray({ page, collection, cv: list[i] }));
  }
  await Promise.all(promises);
  return
};

const parseUserInformation = async ({ enteredPage: page, list }) => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  const start = new Date();
  await multiFlowParse({ page, collection, list });
  const stop = new Date();
  console.log("duration:" + (stop - start) / 1000 + "s");
};

module.exports = parseUserInformation;
