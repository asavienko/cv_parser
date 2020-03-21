const fetch = require('node-fetch');
const _ = require('lodash');
const saveToDb = require('./saveResumeIdToDb');
const saveReport = require('./saveReport');

const parsePages = ({
  reportId,
  options,
  collectionReports,
  collectionResumes,
}) => {
  let i = 0;
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const parseEachPage = async (previousPage) => {
    const currentPage = previousPage || i++;
    const url = `https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20&pg=${currentPage}`;
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      const data = _.get(json, 'Documents.ResumeId', []).map(({ _id }) => ({
        _id,
      }));
      if (!data.length) {
        throw new Error(
          `No data in document. response.Message: ${json.Message}.`,
        );
      }
      const reportMany = await saveToDb({
        data,
        collectionResumes,
      });
      const report = reportMany.reduce((a, b) => ({
        updatedDocumentsCount:
            a.updatedDocumentsCount + b.updatedDocumentsCount,
        newDocumentsCount: a.newDocumentsCount + b.newDocumentsCount,
        foundDocumentsInDbCount:
            a.foundDocumentsInDbCount + b.foundDocumentsInDbCount,
      }));
      report.parsedPage = currentPage;
      report.foundOnPage = data.length;
      report.time = new Date();
      await saveReport(report, reportId, collectionReports);
      parseEachPage();
    } catch (error) {
      await saveReport(
        { error: error.message, parsedPage: currentPage, time: new Date() },
        reportId,
        collectionReports,
      );
      await timeout(30000);
      parseEachPage(currentPage);
    }
  };
  const arrOfPromises = [];
  for (let j = 0; j <= 3; j++) {
    arrOfPromises.push((() => setTimeout(parseEachPage, j * 1000))());
  }

  Promise.all(arrOfPromises);
};

module.exports = parsePages;
