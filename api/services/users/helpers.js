const sameEmailCheck = async ({ user, userParam, collection }) => {
  const hasSameEmail =
    user.email !== userParam.email &&
    (await collection.findOne({ email: userParam.email }));
  return !!hasSameEmail;
};

const userPipelines = {
  getAll: () => [{ $project: { hash: false } }],
  getById: _id => [{ $match: { _id } }, { $project: { hash: 0 } }],
  getSameEmail: email => [
    { $match: { email } },
    { $project: { email: 1 } },
    { $count: "count" }
  ],
  authenticate: email => [{ $match: { email } }]
};

module.exports = { sameEmailCheck, userPipelines };
