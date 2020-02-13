const saveReportToDb = async (report, reportId, collectionReports) => {
  await collectionReports.updateOne(
    { _id: reportId },
    {
      $set: { status: "executes" },
      $push: { log: report }
    }
  );
};

module.exports = saveReportToDb;
