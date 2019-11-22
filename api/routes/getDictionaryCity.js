const connectDb = require("../services/connectMongoDb");

const getDictionaryCity = async (req, res) => {
  //todo up to date data from api
  try {
    const client = await connectDb();
    const collection = client.db("rabotaua").collection("dictionaryCity");
    const result = await collection.find().toArray();
    res.json({ confirmation: "success", data: result });
  } catch (e) {
    res.json({
      confirmation: "fail",
      message: e.message
    });
  }
};

module.exports = getDictionaryCity;
