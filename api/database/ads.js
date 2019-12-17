const connectDb = require("./connectMongoDb");
const { ObjectID } = require("mongodb");

const collectionName = "abs";

async function getAds() {
  const client = await connectDb();
  return await client
    .db("rabotaua")
    .collection(collectionName)
    .find({})
    .toArray();
}

async function insertAd(ad) {
  const client = await connectDb();
  const { insertedId } = await client
    .db("rabotaua")
    .collection(collectionName)
    .insertOne(ad);
  return insertedId;
}

async function deleteAd(id) {
  const client = await connectDb();
  await client
    .db("rabotaua")
    .collection(collectionName)
    .deleteOne({ _id: new ObjectID(id) });
}

async function updateAd(id, ad) {
  const client = await connectDb();
  delete ad._id;
  await client
    .db("rabotaua")
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          ...ad
        }
      }
    );
}

module.exports = {
  insertAd,
  getAds,
  deleteAd,
  updateAd
};
