const express = require("express");

const router = express.Router();
const parseResumeByRequest = require("../services/parser/parseResumeByRequest/parseResumeByRequest");

const getCvByRequest = (req, res, next) => {
  parseResumeByRequest(req.body)
    .then((result = {}) => {
      result.error ? next(result.error) : res.json(result);
    })
    .catch(error => next(error));
};

router.post("/get-by-request", getCvByRequest);

module.exports = router;
