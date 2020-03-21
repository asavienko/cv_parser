const initBrowser = require('./initBrowser');
const login = require('./login');
const getAuthTokenCookies = require('./getAuthTokenCookies');
const connectDb = require('../../../database/connectMongoDb');

const getAuthTokenFromPage = async () => {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();
    const enteredPage = await login(page);
    const token = await getAuthTokenCookies(enteredPage);
    await browser.close();
    const client = await connectDb();
    const tokensCollection = client.db('rabotaua').collection('tokens');
    await tokensCollection.insertOne({ token });
    return token;
  } catch (e) {
    throw Error(e);
  }
};

module.exports = getAuthTokenFromPage;
