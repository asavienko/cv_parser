const getAuthToken = require("../getAuthToken/getAuthTokenFromPage");
const parseRabotauaPages = require("./parseRabotauaPages");
const connectDb = require("../../../database/connectMongoDb");
const checkIsAuthTokenValid = require("../getAuthToken/checkIsAuthTokenValid");

const getResumeFromPages = async searchRequest => {
  try {
    const client = await connectDb();
    const collection = client.db("rabotaua").collection("tokens");
    const [{ token }] = await collection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const isTokenValid = await checkIsAuthTokenValid(token);
    const authToken = isTokenValid ? token : await getAuthToken();
    const options = { headers: { Cookie: authToken } };
    return await parseRabotauaPages({ options, searchRequest });
  } catch (e) {
    return e;
  }
};

module.exports = getResumeFromPages;
