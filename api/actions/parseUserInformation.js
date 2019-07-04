const connectDb = require("./connectMongoDb");

const openContactsSelector =
  'div[id*="ctl00_centerZone_BriefResume1_CvView1_cvHeader_plhBuyResume"] a.btn-primary-new';

const checkFetch = ({ response, resumeId }) =>
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
  if (phone || responseObject.email) {
    console.log(phone || responseObject.email);
    await collection.updateOne({ resumeId }, { $set: data });
  }
};

const evaluateResponse = async ({ target, collection, resumeId }) => {
  console.log("waiting for response");
  const response = await target.waitForResponse(response =>
    checkFetch({ response, resumeId })
  );
  console.log(response)
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
    console.log("going to url");
    await target.goto(url);
    await evaluateResponse({ target, collection, resumeId });
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

const parseUserInformation = async ({ enteredPage: page, list }) => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  // const promises = list.map(cv => getUserInformation({ page, collection, cv }));
  const start = new Date();
  for (let i = 0; i < list.length; i++) {
    await getUserInformation({ page, collection, cv: list[i] });
  }
  const stop = new Date();
  console.log((stop - start) / 1000);
};

module.exports = parseUserInformation;
