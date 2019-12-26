const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectDb = require("../database/connectMongoDb");
const ObjectId = require("mongodb").ObjectID;

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
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("users");
  const user = await collection.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user;
    const token = jwt.sign({ sub: user._id }, SECRET);
    return {
      ...userWithoutHash,
      token
    };
  }
}

async function getAll() {
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("users");
  return await collection.aggregate([{ $project: { hash: false } }]).toArray();
}

async function getById(id) {
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("users");
  const user = await collection
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $project: { hash: 0 } }
    ])
    .toArray();
  return user;
}

async function create(userParam) {
  console.log(userParam);
  const client = await connectDb();
  const collection = client.db("rabotaua").collection("users");
  const [checkName] = await collection
    .aggregate([
      { $match: { username: userParam.username } },
      { $project: { username: 1 } },
      { $count: "count" }
    ])
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
  await collection.insertOne(userParam);
}

async function update(_id, userParam) {
  const collection = await getCollection();
  const user = await collection.aggregate([{ $match: _id }]);

  // validate
  if (!user) throw "User not found";

  const sameNameCheck =
    user.username !== userParam.username &&
    (await collection.findOne({ username: userParam.username }));

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
