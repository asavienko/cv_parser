const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");

let i = 1;



const parsePages = async ({ reportId, options }) => {
  const arrOfPromises = [];
  for (let j = i; j <= i + 40; j++) {
    const url = `https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20&pg=${j}`;
    const promise = new Promise(fetch(url, options));
    arrOfPromises.push(promise);
    console.log(j);
  }
  i += 40;

  Promise.all(arrOfPromises)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return saveToDb(json.Documents);
    })
    .then(report => {
      return saveReport(report, reportId);
    })
    .then(reports => {
      console.log(reports);
      console.log(reports.find(report => report.status === "ended"));
      reports.find(report => report.status === "ended") &&
        parsePages({
          reportId,
          options
        });
    });
};

module.exports = parsePages;
