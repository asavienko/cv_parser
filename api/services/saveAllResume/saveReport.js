const saveReportToDb = async (
  { emptyPages = 0, insertedCount = 0, insertedIds = [] },
  reportId,
  collectionReports
) => {
  collectionReports.updateOne(
    { _id: reportId },
    {
      $inc: { addedResume: insertedCount, emptyPages },
      $push: { insertedIds: { $each: insertedIds } },
      $set: { status: "executes" }
    }
  );
  return emptyPages ? { status: "finishing" } : { status: "executes" };
};

module.exports = saveReportToDb;
