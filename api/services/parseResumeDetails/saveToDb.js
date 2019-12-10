const saveToDb = async ({ data, collectionResumes }) => {
  const _id = data.resumeId;
  data = { _id };
  const response = await collectionResumes.aggregate(
    { $match: { _id } },
    {
      $set: data,
      $unset: { resumeId: "" }
    }
  );
  return {
    resumeId: _id,
    date: new Date(),
    response
  };
};

module.exports = saveToDb;
