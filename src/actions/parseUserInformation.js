const connectDb = require("./connectMongoDb");

const parseCvResponse = async (collection, resumeId, response) => {
  if (
    response.request().resourceType() === "xhr" &&
    response.url() === `https://employer-api.rabota.ua/resume/${resumeId}`
  ) {
    const responseObject = await response.json();
    const phone = responseObject.phone.match(/\+*\d+/gm).join("");
    const data = {
      addDate: responseObject.addDate,
      birthDate: responseObject.birthDate,
      educations: responseObject.educations,
      email: responseObject.email,
      name: responseObject.name,
      phone,
      salaryFull: responseObject.salaryFull,
      skills: responseObject.skills,
      surname: responseObject.surname,
      $currentDate: { lastModified: true }
    };
    await collection.updateOne(data);
  }
};

const getUserInformation = async (page, { url, resumeId }, collection) => {
  if (url) {
    await console.log("starting parse information");
    const context = await page.browserContext();
    const target = await context.newPage();
    await target.on(
      "response",
      parseCvResponse.bind(null, collection, resumeId)
    );
    await target.goto(url);
    await target.waitFor("a.btn-primary-new");
    await target.click("a.btn-primary-new");
    await target.close();
  }
};

const parseUserInformation = async (page, list) => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  list.forEach(cv => {
    getUserInformation(page, cv, collection);
  });
};

module.exports = parseUserInformation;
