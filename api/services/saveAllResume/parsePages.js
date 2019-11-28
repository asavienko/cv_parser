const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");

const parsePages = ({
  reportId,
  options,
  collectionReports,
  collectionResumes
}) => {
  let i = 0;
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const parseEachPage = async x => {
    const url = `https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20&pg=${x ||
      i++}`;
    let z = x || i;
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (!("Documents" in json) || json.Documents.length === 0) {
        throw new Error(
          `No data in document. response.Message: ${
            json.Message
          }. Documents in json: ${"Documents" in json}. Documents.length: ${
            json.Documents.length
          }`
        );
      }
      const reportMany = await saveToDb({
        data: json.Documents,
        collectionResumes
      });
      const report = reportMany.reduce((a, b) => {
        return {
          updatedDocumentsCount:
            a.updatedDocumentsCount + b.updatedDocumentsCount,
          newDocumentsCount: a.newDocumentsCount + b.newDocumentsCount,
          foundDocumentsInDbCount:
            a.foundDocumentsInDbCount + b.foundDocumentsInDbCount
        };
      });
      report.parsedPage = z;
      report.foundOnPage = json.Documents.length;
      report.time = new Date();
      await saveReport(report, reportId, collectionReports);
      parseEachPage();
    } catch (error) {
      await saveReport(
        { error: error.message, parsedPage: z, time: new Date() },
        reportId,
        collectionReports
      );
      await timeout(30000);
      parseEachPage(z);
    }
  };
  const arrOfPromises = [];
  for (let j = 0; j <= 1; j++) {
    arrOfPromises.push((() => setTimeout(parseEachPage, j * 1 * 1000))());
  }

  Promise.all(arrOfPromises);
};

module.exports = parsePages;
