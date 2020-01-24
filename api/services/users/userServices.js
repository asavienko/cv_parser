const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDb = require("../../database/connectMongoDb");
const uniqid = require("uniqid");
const { sameEmailCheck, userPipelines } = require("./helpers");

const create = async userParam => {
  const collection = await getUsersCollection();
  const [checkEmail] = await collection
    .aggregate(userPipelines.getSameEmail(userParam.email))
    .toArray();
  if (checkEmail) throw `Email "${userParam.email}" уже занят`;

  // hash password
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    userParam.createdDate = new Date();
    delete userParam.password;
  }

  // save user
  userParam._id = uniqid();
  userParam.emailVerified = false;
  await collection.insertOne(userParam);
};

const authenticate = async ({ email, password }) => {
  const collection = await getUsersCollection();
  const [user] = await collection
    .aggregate(userPipelines.authenticate(email))
    .toArray();
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user._id }, SECRET);
    return { ...userWithoutHash, token };
  }
};

const getUsersCollection = async () => {
  const client = await connectDb();
  return client.db("rabotaua").collection("users");
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

const update = async (_id, userParam) => {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ _id });

  // validate
  if (!user) throw "Юзер не найден";

  const checkEmail = sameEmailCheck({ user, userParam, collection });

  if (checkEmail) {
    throw `Email "${userParam.email}" уже занят`;
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
