const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");
const saveErrorStatus = require("./saveErrorStatus");
const getId = require("./getId");

const parseDetails = ({
  reportId,
  options,
  collectionReports,
  collectionResumes
}) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const parseEachResume = async (previousResume, skip) => {
    const _id = await getId({ collectionResumes, skip, previousResume });
    const url = `https://employer-api.rabota.ua/resume/${_id}`;
    try {
      const response = await fetch(url, options);
      const { status: responseStatus } = response;
      if (responseStatus === 200) {
        const data = await response.json();
        delete data.resumeId;
        const report = await saveToDb({
          data,
          collectionResumes
        });
        await saveReport(report, reportId, collectionReports);
        parseEachResume(null, skip);
        return;
      } if (responseStatus === 204) {
        const report = await saveErrorStatus({
          responseStatus,
          collectionResumes,
          _id
        });
        await saveReport(report, reportId, collectionReports);
        parseEachResume(null, skip);
        return;
      }
      await saveReport(
        {
          error: `Error status: ${responseStatus}`,
          resumeId: _id,
          time: new Date()
        },
        reportId,
        collectionReports
      );
      await timeout(30000);
      parseEachResume(_id, skip);
    } catch (error) {
      await saveReport(
        { error: error.message, resumeId: _id, time: new Date() },
        reportId,
        collectionReports
      );
      await timeout(30000);
      parseEachResume(_id, skip);
    }
  };
  const arrOfPromises = [];
  for (let j = 0; j < 10; j++) {
    arrOfPromises.push(
      (() => setTimeout(() => parseEachResume(null, j), j * 1.5 * 1000))()
    );
  }

  Promise.all(arrOfPromises);
};

module.exports = parseDetails;
