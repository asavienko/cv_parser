const getAuthToken = require('../getAuthToken/getAuthTokenFromPage');
const parseRabotauaPages = require('./parseRabotauaPages');
const connectDb = require('../../../database/connectMongoDb');
const checkIsAuthTokenValid = require('../getAuthToken/checkIsAuthTokenValid');

const getResumeFromPages = async (searchRequest) => {
  try {
    const client = await connectDb();
    const collection = client.db('rabotaua').collection('tokens');
    const [{ token }] = await collection.find().sort({ _id: -1 }).limit(1).toArray();
    const isValidToken = await checkIsAuthTokenValid(token);
    const authToken = isValidToken ? token : await getAuthToken();
    const options = { headers: { Cookie: authToken } };
    return await parseRabotauaPages({ options });
  } catch (e) {
    return e;
  }
};

module.exports = getResumeFromPages;
