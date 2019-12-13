const getId = async ({ collectionResumes, skip, previousResume }) => {
  if (previousResume) return previousResume;
  const [{ _id }] = await collectionResumes
    .aggregate([
      {
        $match: {
          email: { $exists: false },
          responseStatus: { $nin: [204] }
        }
      },
      { $project: { _id: true } },
      { $skip: skip },
      { $limit: 1 }
    ])
    .toArray();
  return _id;
};

module.exports = getId;
