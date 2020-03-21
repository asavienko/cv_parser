const saveResumeIdToDb = ({ data, collectionResumes }) => {
  const responseManyPromises = data.map(async _id => {
    const responseOne = await collectionResumes.updateOne(
      { _id },
      {
        $set: _id
      },
      { upsert: true }
    );
    return {
      updatedDocumentsCount: responseOne.modifiedCount,
      newDocumentsCount: responseOne.upsertedCount,
      foundDocumentsInDbCount: responseOne.matchedCount
    };
  });
  const responseMany = Promise.all(responseManyPromises);
  return responseMany;
};

module.exports = saveResumeIdToDb;
