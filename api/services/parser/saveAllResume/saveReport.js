const saveReportToDb = async (report, reportId, collectionReports) => {
  await collectionReports.updateOne(
    { _id: reportId },
    {
      $push: { log: report },
      $set: { status: "executes" }
    }
  );
};

module.exports = saveReportToDb;
