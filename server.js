require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const totalCvs = require("./api/routes/totalCvs");
const getDictionaryCity = require("./api/routes/getDictionaryCity");
const parseAllResume = require("./api/routes/parseAllResume");
const parseResumeDetails = require("./api/routes/parseResumeDetails");

const { getAds, insertAd, deleteAd, updateAd } = require("./api/database/ads");

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();

const port = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/dictionary-city", getDictionaryCity);
app.get("/total-cvs", totalCvs);
app.get("/parse-all-resume", parseAllResume);
app.get("/parse-resume-details", parseResumeDetails);

app.get("/parse-cvs", async (req, res) => {
  res.json({ minutes: 134 });
});
app.get("/cvlist", async (req, res) => {
  const query = req.query;
  try {
    const collection = await connectDb("rabotaua", "cvs");
    const result = await collection.find(query).toArray();
    res.json({ data: result });
  } catch ({ message }) {
    res.json({ error: message });
  }
});


/////////////////////////////////////////////////////
/*

Oauth  start

*/

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://babyroom.eu.auth0.com/.well-known/jwks.json`
  }),

  audience: "https://babyroom.eu.auth0.com/api/v2/",
  issuer: `https://babyroom.eu.auth0.com/`,
  algorithms: ["RS256"]
});

app.use(checkJwt);

app.get("/", async (req, res) => {
  res.send(await getAds());
});
app.post("/post", async (req, res) => {
  const newAd = req.body;
  await insertAd(newAd);
  res.send({ message: "New ad inserted." });
});

app.delete("/:id", async (req, res) => {
  console.log(req.params.id);
  await deleteAd(req.params.id);
  res.send({ message: "Ad removed." });
});

app.put("/:id", async (req, res) => {
  const updatedAd = req.body;
  await updateAd(req.params.id, updatedAd);
  res.send({ message: "Ad updated." });
});

/*

Oauth  finish

*/

//////////////////////////////////////////////////////////

app.listen(port, () => console.log(`Listening on port ${port}...`));
