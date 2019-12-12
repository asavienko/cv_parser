const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");
const saveErrorStatus = require("./saveErrorStatus");

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
    const [{ _id }] =
      previousResume ||
      (await collectionResumes
        .aggregate([
          {
            $match: {
              email: { $exists: false },
              responseStatus: { $nin: [204] }
            }
          },
          { $project: { _id: true } },
          { $skip: skip },
          { $limit: 1 }
        ])
        .toArray());
    const url = `https://employer-api.rabota.ua/resume/${_id}`;
    console.log(`id in url: ${_id}`);
    try {
      const response = await fetch(url, options);
      const { status: responseStatus } = response;
      console.log(responseStatus);
      if (responseStatus === 204) {
        const report = await saveErrorStatus({
          responseStatus,
          collectionResumes,
          _id
        });
        await saveReport(report, reportId, collectionReports);
        parseEachResume(null, skip);
      } else if (responseStatus !== 200) {
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
        parseEachResume([{ _id }], skip);
      } else if (responseStatus === 200) {
        const json = await response.json();
        const report = await saveToDb({
          data: json,
          collectionResumes
        });
        await saveReport(report, reportId, collectionReports);
        parseEachResume(null, skip);
      }
    } catch (error) {
      await saveReport(
        { error: error.message, resumeId: _id, time: new Date() },
        reportId,
        collectionReports
      );
      await timeout(30000);
      parseEachResume([{ _id }], skip);
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
