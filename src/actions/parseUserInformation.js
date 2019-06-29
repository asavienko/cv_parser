const connectDb = require("./connectMongoDb");

const observedXhr = async ({ target, resumeId }) => {
  /*  return new Promise(resolve =>
    target.on("request", request => {
      if (request.resourceType() === "xhr") {
        if (
          request.url() === `https://employer-api.rabota.ua/resume/${resumeId}`
        ) {
          resolve();
        }
        request.continue();
      }
      request.continue();
    })
  );*/
};
//todo not usage 

const parseCvResponse = async ({
  collection,
  resumeId,
  response,
  requestChecked
}) => {
  const checkFetch =
    requestChecked ||
    (response.request().resourceType() === "xhr" &&
      response.url() === `https://employer-api.rabota.ua/resume/${resumeId}`);
  if (checkFetch) {
    const responseObject = await response.json();
    console.log(await response);
    const phone =
      (responseObject.phone &&
        responseObject.phone.match(/\+*\d+/gm).join("")) ||
      "";
    const hasPhoneOrEmail = phone == true || responseObject.email == true;
    const data = {
      additionals: responseObject.additionals,
      addDate: new Date(responseObject.addDate),
      birthDate: new Date(responseObject.birthDate),
      educations: responseObject.educations,
      email: responseObject.email,
      name: responseObject.name,
      phone,
      salaryFull: responseObject.salaryFull,
      skills: responseObject.skills,
      surname: responseObject.surname,
      lastModified: new Date()
    };
    if (hasPhoneOrEmail) {
      await collection.updateOne({ resumeId }, { $set: data });
    }
  }
};

const getUserInformation = async ({
  page,
  collection,
  cv: { url, resumeId }
}) => {
  if (url) {
    await console.log("starting parse information");
    const context = await page.browserContext();
    const target = await context.newPage();
    await console.log("going to url");
    await target.on("response", async response => {
      await parseCvResponse({ collection, resumeId, response });
    });
    await target.goto(url);
    try {
      await console.log("waiting for button");
      await target.waitFor(
        'div[id*="ctl00_centerZone_BriefResume1_CvView1_cvHeader_plhBuyResume"] a.btn-primary-new'
      );
      await target.click(
        'div[id*="ctl00_centerZone_BriefResume1_CvView1_cvHeader_plhBuyResume"] a.btn-primary-new'
      );

      await console.log("button clicked");
      await target.waitForResponse(
        response =>
          response.request().resourceType() === "xhr" &&
          response.url() ===
            `https://employer-api.rabota.ua/resume/${resumeId}`
      );
      // await target.removeAllListeners("response");
      // await target.removeAllListeners("request");
      // await target.setRequestInterception(true);
      // await observedXhr({ target, resumeId});
      //todo not usage
      await console.log("closing page");
    } catch (e) {
      console.log("user information has been already opened");
      console.log(e.message);
    } finally {
      await console.log("closing page");
      await target.close();
    }
  }
};

const parseUserInformation = async ({ enteredPage: page, list }) => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  console.log(page);
  list.forEach(cv => {
    getUserInformation({ page, collection, cv });
  });
};

module.exports = parseUserInformation;
