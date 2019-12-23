const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDb = require("../../database/connectMongoDb");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getCollection() {
  const client = await connectDb();
  return client.db("rabotaua").collection("users");
}

async function authenticate({ username, password }) {
  const user = await getCollection().findOne({ username });

  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user.id }, SECRET);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  return await getCollection().aggregate([{ project: { hash: true } }]);
}

async function getById(_id) {
  return await getCollection().aggregate([
    { $match: { _id } },
    { $project: { hash: true } }
  ]);
}

async function create(userParam) {
  // validate
  const collection = await getCollection();
  const checkName = await collection.aggregate([
    { $match: { username: userParam.username } }
  ]);
  if (checkName) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
    delete userParam.password;
  }

  // save user
  await collection.insertOne(userParam);
}

async function update(_id, userParam) {
  const collection = await getCollection();
  const user = await collection.aggregate([{ $match: _id }]);

  // validate
  if (!user) throw "User not found";

  const sameNameCheck =
    user.username !== userParam.username &&
    (await collection.aggregate([
      { $match: { username: userParam.username } }
    ]));

  if (sameNameCheck) {
    throw 'Username "' + userParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  await collection.updateOne({ _id }, { userParam });
}

async function _delete(_id) {
  await getCollection().remove({ _id });
}
