const express = require("express");

const router = express.Router();
const parseResumeByRequest = require("../services/parser/parseResumeByRequest/parseResumeByRequest");
const parseCvInfo = require("../services/parser/parseCvInfo/parseCvInfo");

const fetch = require("node-fetch");

const $ = require("cheerio");

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

const getCvInfo = async ({ body: { id } }, res, next) => {
  /*  parseCvInfo(id)
    .then((result = {}) => {
      result.error ? next(result.error) : res.json(result);
    })
    .catch(error => next(error));*/
  const response = await fetch(`https://rabota.ua/cv/${id}`);
  const html = await response.text();
  const form = $("#resume_holder", html);
  res.json(form.html());
};

router.post("/get-by-request", getCvByRequest);
router.post("/get-cv-info", getCvInfo);

module.exports = router;
