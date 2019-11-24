const saveToDb = async ({ data, collectionResumes }) => {
  console.log(data.length);
  if (data.length) {
    const response = await collectionResumes.insertMany(data, {
      ordered: false
    });
    const insertedIds = Object.values(response.insertedIds);
    return {
      insertedCount: response.insertedCount,
      insertedIds,
      emptyPages: 0
    };
  }
  return { emptyPages: 1 };
};

module.exports = saveToDb;
