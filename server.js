require("dotenv").config();
const cors = require("cors");

const totalCvs = require("./api/routes/totalCvs");
const getDictionaryCity = require("./api/routes/getDictionaryCity");
const parseAllResume = require("./api/routes/parseAllResume");
const parseResumeInformation = require("./api/routes/parseResumeInformation");
const express = require("express");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const port = 5000;

app.get("/dictionary-city", getDictionaryCity);
app.get("/total-cvs", totalCvs);
app.get("/parse-all-resume", parseAllResume);
app.get("/parse-resume-information", parseResumeInformation);

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
