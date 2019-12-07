const fetch = require("node-fetch");
const saveToDb = require("./saveToDb");
const saveReport = require("./saveReport");

const parseDetails = ({
  reportId,
  options,
  collectionReports,
  collectionResumes,
  collectionResumesInformation
}) => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const parseEachResume = async previousResume => {
    const resume =
      previousResume ||
      (await collectionResumes
        .aggregate([
          { $match: { status: { $nin: ["informationSaved", "parsing"] } } },
          { $project: { resumeId: "$ResumeId" } },
          { $limit: 1 }
        ])
        .toArray()[0]);
    console.log(resume);
    previousResume ||
      (await collectionResumes.updateOne(
        { _id: resume._id },
        { $set: { status: "parsing" } }
      ));
    const url = `https://employer-api.rabota.ua/resume/${resume.resumeId}`;

    try {
      const response = await fetch(url, options);
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      /* const report = await saveToDb({
        data: json.Documents,
        collectionResumes,
        collectionResumesInformation
      });
      await saveReport(report, reportId, collectionReports);*/
      parseEachResume();
    } catch (error) {
      /*
      await saveReport(
        { error: error.message, resumeId, time: new Date() },
        reportId,
        collectionReports
      );*/
      console.log(error);
      await timeout(30000);
      parseEachResume(resume);
    }
  };
  const arrOfPromises = [];
  for (let j = 0; j <= 1; j++) {
    arrOfPromises.push((() => setTimeout(parseEachResume, j * 1 * 1000))());
  }

  Promise.all(arrOfPromises);
};

module.exports = parseDetails;
