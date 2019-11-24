const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");

const parsePages = async ({
  reportId,
  options,
  collectionReports,
  collectionResumes
}) => {
  let i = 0;

  const parseEachPage = async () => {
    const url = `https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20&pg=${i++}`;
    console.log(i);
    const response = await fetch(url, options);
    const json = await response.json();
    const report = await saveToDb({ data: json.Documents, collectionResumes });
    const reportSaveResult = await saveReport(
      report,
      reportId,
      collectionReports
    );
    reportSaveResult.status === "executes" && (await parseEachPage());
  };
  const arrOfPromises = [];
  for (let j = 0; j < 200; j++) {
    arrOfPromises.push(parseEachPage());
  }

  await Promise.all(arrOfPromises);
};

module.exports = parsePages;
