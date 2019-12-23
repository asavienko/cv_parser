require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const totalCvs = require("./api/routes/totalCvs");
const getDictionaryCity = require("./api/routes/getDictionaryCity");
const parseAllResume = require("./api/routes/parseAllResume");
const parseResumeDetails = require("./api/routes/parseResumeDetails");

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

app.listen(port, () => console.log(`Listening on port ${port}...`));
