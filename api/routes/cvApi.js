const express = require("express");

const router = express.Router();
const parseResumeByRequest = require("../services/parser/parseResumeByRequest/parseResumeByRequest");
const parseCvInfo = require("../services/parser/parseCvInfo/parseCvInfo");

const getCvByRequest = (req, res, next) => {
  parseResumeByRequest(req.body)
    .then(response => {
      const { Documents, error } = response;
      if (error || !Documents.length) {
        return next("error with request to resource");
      }
      return res.json(response);
    })
    .catch(error => next(error));
};

const getCvInfo = ({ body: { id } }, res, next) => {
  parseCvInfo(id)
    .then((result = {}) => {
      result.error ? next(result.error) : res.json(result);
    })
    .catch(error => next(error));
};

router.post("/get-by-request", getCvByRequest);
router.post("/get-cv-info", getCvInfo);

module.exports = router;
