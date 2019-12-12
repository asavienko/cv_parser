const saveErrorStatus = async ({ responseStatus, collectionResumes, _id }) => {
  const response = await collectionResumes.updateOne(
    { _id },
    {
      $set: { responseStatus }
    }
  );
  const inserted = response.modifiedCount === 1;
  console.log(`inserted error status ${inserted}`);
  return {
    resumeId: _id,
    date: new Date(),
    responseStatus,
    inserted
  };
};

module.exports = saveErrorStatus;
