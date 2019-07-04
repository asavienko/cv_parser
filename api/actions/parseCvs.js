const connectDb = require("./connectMongoDb");
const searchRequest = require("../constants/userData").searchRequest;

let errorCounter = 0;
// todo sick the other variant
let parsedPage = null;

const parseDocument = async ({ collection, cv }) => {
  const {
    Age: age,
    CityName: cityName,
    DisplayName: displayName,
    Experience: experience,
    ResumeId: resumeId,
    Salary: salary,
    Speciality: speciality,
    Url,
    Photo
  } = cv;
  const photo = Photo.includes("non-photo.png") ? "" : Photo;
  const url = `https://rabota.ua${Url}`;
  const lastModified = new Date();
  const data = {
    age,
    cityName,
    displayName,
    experience,
    photo,
    resumeId,
    salary,
    speciality,
    url,
    lastModified
  };
  if (resumeId) {
    const hasData = await collection.findOne({ resumeId });
    !hasData && (await collection.insertOne(data));
  }
};

const parseResponse = async ({ collection, response }) => {
  console.log("parsing xhr");
  const { Documents } = await response.json();
  Documents && Documents.forEach(cv => parseDocument({ collection, cv }));
};

const parseEachPage = async ({ page, collection }) => {
  //todo how to improve this function, so don't pass collection in each implementing
  try {
    console.log("before catch response url is: " + page.url());
    console.log("waiting for the new search page");
    const response = await page.waitForResponse(
      response =>
        response.request().resourceType() === "xhr" &&
        response.url().includes("https://rabota.ua/api/resume/search")
    );
    await parseResponse({ collection, response });
    await page.waitFor("a.pager__button-next");
    await page.click("a.pager__button-next");
    parsedPage = page.url();
    console.log(`listening the URL ${parsedPage}`);
    errorCounter = 0;
    parseEachPage({ page, collection });
  } catch (e) {
    if (errorCounter > 3) {
      return e;
    }
    errorCounter++;
    await page.goto(parsedPage);
    parseEachPage({ page, collection });
  }
};

const parseCvs = async page => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  try {
    console.log("going to search page");
    await page.goto(searchRequest); //todo generate page from request
    await page.waitFor(".cvdb-search-form__find-button");
    await page.click(".cvdb-search-form__find-button");
    await parseEachPage({ page, collection });
  } catch (e) {
    return e;
  } finally {
    client.close();
  }
};

module.exports = parseCvs;
