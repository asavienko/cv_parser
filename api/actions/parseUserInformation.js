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
    await collection.updateOne({ resumeId }, { $set: data });
  }
};

const evaluateResponse = async ({ target, collection, resumeId }) => {
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
    const context = page.browserContext();
    const target = await context.newPage();

    target.on("response", async response => {
      const isResponseExist = await checkResponse({ response, resumeId });
      isResponseExist &&
        parseCvResponse({
          collection,
          resumeId,
          response
        });
    });
    await target.goto(url);
    try {
      await target.waitFor(openContactsSelector);
      await target.click(openContactsSelector);
      await evaluateResponse({ target, collection, resumeId });
    } finally {
      await target.close();
    }
  }
};

const multiFlowParse = ({ page, collection, list }) => {
  const wait = ms => new Promise((r, j) => setTimeout(r, ms));
  const maxFlows = 8;
  let flowsCounter = 0;
  async function loopArray({ page, collection, cv }) {
    while (flowsCounter >= maxFlows) {
      await wait(5000);
    }
    flowsCounter++;

    try {
      await getUserInformation({ page, collection, cv });
      flowsCounter--;
      return "successful";
    } catch (e) {
      flowsCounter--;
      return e.name;
    }
  }

  let promises = [];
  for (let i = 0; i < list.length; i++) {
    wait(2000).then(()=> promises.push(loopArray({ page, collection, cv: list[i] })));
  }
  Promise.all(promises);
};

const parseUserInformation = async ({ enteredPage: page, list }) => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  await multiFlowParse({ page, collection, list });
};

module.exports = parseUserInformation;
