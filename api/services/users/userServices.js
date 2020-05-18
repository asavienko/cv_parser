const { SECRET } = process.env;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const connectDb = require("../../database/connectMongoDb");
const { sameEmailCheck, userPipelines } = require("./helpers");

const getUsersCollection = async () => {
  const client = await connectDb();
  return client.db("rabotaua").collection("users");
};

const create = async userParam => {
  const collection = await getUsersCollection();
  const [checkEmail] = await collection
    .aggregate(userPipelines.getSameEmail(userParam.email))
    .toArray();
  if (checkEmail) throw new Error(`Email "${userParam.email}" уже занят`);
  const { password, ...newUserParamas } = userParam;
  // hash password
  if (password) {
    newUserParamas.hash = bcrypt.hashSync(userParam.password, 10);
    newUserParamas.createdDate = new Date();
  }

  // save user
  newUserParamas._id = uniqid();
  newUserParamas.emailVerified = false;
  await collection.insertOne(newUserParamas);
};

const authenticate = async ({ email, password }) => {
  const collection = await getUsersCollection();
  const [user] = await collection
    .aggregate(userPipelines.authenticate(email))
    .toArray();
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, _id, ...userWithoutHashAndId } = user;
    const token = jwt.sign({ sub: _id }, SECRET);
    return { ...userWithoutHashAndId, token };
  }
  return false;
};

const getAll = async () => {
  const collection = await getUsersCollection();
  return collection.aggregate(userPipelines.getAll()).toArray();
};

const getById = async _id => {
  const collection = await getUsersCollection();
  return collection.aggregate(userPipelines.getById(_id)).toArray();
};

const update = async (_id, userParam) => {
  const collection = await getUsersCollection();
  const user = await collection.findOne({ _id });

  // validate
  if (!user) throw Error("Юзер не найден");

  const checkEmail = sameEmailCheck({ user, userParam, collection });

  if (checkEmail) {
    throw Error(`Email "${userParam.email}" уже занят`);
  }

  const { password, ...newUserParams } = { ...userParam };
  // hash password if it was entered
  if (password) {
    newUserParams.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  await collection.updateOne({ _id }, { newUserParams });
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
