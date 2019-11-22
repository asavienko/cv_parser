require("dotenv").config();
const cors = require("cors");

const totalCvs = require("./api/routes/totalCvs");
const getDictionaryCity = require("./api/routes/getDictionaryCity");
const parseAllResume = require("./api/routes/parseAllResume");
const connectCollection = require("./api/services/connectMongoDb");
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


app.get("/parse-cvs", async (req, res) => {
  res.json({ confirmation: "success", minutes: 134 });
});
app.get("/cvlist", async (req, res) => {
  const query = req.query;
  try {
    const collection = await connectCollection("rabotaua", "cvs");
    const result = await collection.find(query).toArray();
    res.json({ confirmation: "success", data: result });
  } catch (err) {
    res.json({
      confirmation: "fail",
      message: err.message
    });

    //todo replace error response
    /*res.json({
      confirmation: "fail",
      error: {message: err.message}
    });*/
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
