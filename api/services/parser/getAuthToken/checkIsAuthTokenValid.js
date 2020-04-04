const fetch = require("node-fetch");
const connectDb = require("../../../database/connectMongoDb");
const { USER_HOMEPAGE } = require("../../../constants/rabotaUaUrls");

const checkIsAuthTokenValid = async () => {
  try {
    const client = await connectDb();
    const collection = client.db("rabotaua").collection("tokens");
    const [{ token }] = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const options = { headers: { Cookie: token } };
    const response = await fetch(USER_HOMEPAGE, options);
    const html = await response.text();
    if (html.indexOf("Выйти") !== -1) {
      return token;
    }
  } catch (e) {
    return e;
  }
};

module.exports = checkIsAuthTokenValid;
