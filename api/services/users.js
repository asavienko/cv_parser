const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDb = require("../database/connectMongoDb");
const uniqid = require("uniqid");

const userPipelines = {
  getAll: () => [{ $project: { hash: false } }],
  getById: _id => [{ $match: { _id } }, { $project: { hash: 0 } }],
  getSameUsername: userParams => [
    { $match: { username: userParams.username } },
    { $project: { username: 1 } },
    { $count: "count" }
  ]
};

const getUsersCollection = async () => {
  const client = await connectDb();
  return client.db("rabotaua").collection("users");
};

const sameNameCheck = async ({ user, userParam, collection }) => {
  const sameNameCheck =
    user.username !== userParam.username &&
    (await collection.findOne({ username: userParam.username }));
  return !!sameNameCheck;
};

const authenticate = async ({ username, password }) => {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user._id }, SECRET);
    return {
      ...userWithoutHash,
      token
    };
  }
};

const getAll = async () => {
  const collection = await getUsersCollection();
  return await collection.aggregate(userPipelines.getAll()).toArray();
};

const getById = async _id => {
  const collection = await getUsersCollection();
  const user = await collection.aggregate(userPipelines.getById(_id)).toArray();
  return user;
};

const create = async userParam => {
  const collection = await getUsersCollection();
  const [checkName] = await collection
    .aggregate(userPipelines.getSameUsername(userParam))
    .toArray();
  if (checkName) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    userParam.createdDate = new Date();
    delete userParam.password;
  }

  // save user
  userParam._id = uniqid();
  await collection.insertOne(userParam);
};

const update = async (_id, userParam) => {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ _id });

  // validate
  if (!user) throw "User not found";

  const checkName = await sameNameCheck({ user, userParam, collection });

  if (checkName) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    delete userParam.password;
  }

  // copy userParam properties to user
  await collection.updateOne({ _id }, { userParam });
};

const remove = async _id => {
  const collection = await getUsersCollection();
  await collection.remove({ _id });
};

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  remove
};
