const connectDb = require("./connectMongoDb");
const searchRequest = require("../constants/userData").searchRequest;

let errorCounter = 0;
let parsedPage = null;

const parseDocument = async (collection, cv) => {
  let photo = cv.Photo.includes("non-photo.png") ? "" : cv.Photo;

  const data = {
    age: cv.Age,
    cityName: cv.CityName,
    displayName: cv.DisplayName,
    experience: cv.Experience,
    photo,
    resumeId: cv.ResumeId,
    salary: cv.Salary,
    speciality: cv.Speciality,
    url: `https://rabota.ua${cv.Url}`,
    $currentDate: { lastModified: true }
  };
  if ("ResumeId" in cv) {
    collection.findOne({ resumeId: cv.resumeId }).then(result => {
      if (!result) {
        collection.insertOne(data);
      }
    });
  }
};

const parseResponse = async (collection, response) => {
  if (response.request().resourceType() === "xhr") {
    console.log("parsing xhr");
    const isListPage = await response
      .url()
      .includes("https://rabota.ua/api/resume/search");
    if (isListPage) {
      const responseObject = await response.json();
      const documentsObject = await responseObject.Documents;
      documentsObject &&
        (await documentsObject.forEach(parseDocument.bind(null, collection)));
    }
  }
};

const parseEachPage = async (page, collection) => {
  //todo how to improve this function, so don't pass collection in each implementing
  try {
    await console.log("before catch response url is: " + page.url());
    await console.log("waiting for the new search page");

    await page.waitFor("a.pager__button-next");
    const lastPage = await page.url();
    await page.click("a.pager__button-next");
    await page.waitFor(lastPage => lastPage !== document.URL, {}, lastPage);
    parsedPage = await page.url();
    console.log(`listening the URL ${parsedPage}`);
    errorCounter = 0;
    await parseEachPage(page, collection);
  } catch (e) {
    if (errorCounter > 3) {
      return console.log(e);
    }
    errorCounter++;
    await page.goto(parsedPage);
    await parseEachPage(page, collection);
  }
};

const parseCvs = async page => {
  const client = await connectDb();
  const collection = await client.db("rabotaua").collection("cvs");
  try {
    await console.log("going to search page");
    await page.goto(searchRequest); //todo generate page from request
    await page.on("response", parseResponse.bind(null, collection));
    await page.waitFor(".cvdb-search-form__find-button");
    await page.click(".cvdb-search-form__find-button");
    await page.waitForNavigation();
    //todo now is parsing all pages except first
    await parseEachPage(page, collection);
  } catch (e) {
    return console.log(e);
  } finally {
    client.close();
  }
};

module.exports = parseCvs;
