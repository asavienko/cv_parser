const saveToDb = async ({ data, collectionResumes }) => {
  const { resumeId: _id } = data;
  delete data.resumeId;
  const response = await collectionResumes.updateOne(
    { _id },
    {
      $set: data,
      $unset: { responseStatus: "" }
    }
  );
  const { upsertedId } = response;
  const updated = response.modifiedCount === 1;
  const upserted = response.upsertedCount === 1;

  return {
    resumeId: _id,
    date: new Date(),
    updated,
    upserted,
    upsertedId
  };
};

module.exports = saveToDb;
