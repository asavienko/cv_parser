require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const totalCvs = require("./api/routes/parser/totalCvs");
const parseAllResume = require("./api/routes/parser/parseAllResume");
const parseResumeDetails = require("./api/routes/parser/parseResumeDetails");
const errorHandler = require("./api/middleware/error-handler");
const jwt = require("./api/middleware/jwt");
const joiMiddleware = require("./api/middleware/joi");
const usersApi = require("./api/routes/usersApi");
const dictionariesApi = require("./api/routes/dictionariesApi");
const cvApi = require("./api/routes/cvApi");

const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/cv/total-cvs", totalCvs);
app.get("/parse-all-resume", parseAllResume);
app.get("/parse-resume-details", parseResumeDetails);

app.get("/parse-cvs", async (req, res) => {
  res.json({ minutes: 134 });
});

app.use(joiMiddleware());
app.use(jwt());

app.use("/users", usersApi);
app.use("/dictionaries", dictionariesApi);
app.use("/cv", cvApi);

app.use(errorHandler);

// eslint-disable-next-line  no-console
app.listen(port, () => console.log(`Listening on port ${port}...`));
