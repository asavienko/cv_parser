const saveToDb = ({ data, collectionResumes }) => {
  const responseManyPromises = data.map(async cv => {
    const responseOne = await collectionResumes.updateOne(
      { ResumeId: cv.ResumeId },
      {
        $set: {
          Speciality: cv.Speciality,
          FullName: cv.FullName,
          DisplayName: cv.DisplayName,
          Salary: cv.Salary,
          CityName: cv.CityName,
          Experience: cv.Experience,
          Photo: cv.Photo
        }
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

module.exports = saveToDb;
