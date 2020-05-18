const express = require("express");

const router = express.Router();
const fetch = require("node-fetch");
const $ = require("cheerio");
const parseResumeByRequest = require("../services/parser/parseResumeByRequest/parseResumeByRequest");
const { createNewCvList } = require("../services/saveCvSevices");

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

const getCvInfo = async ({ body: { id } }, res) => {
  /*  parseCvInfo(id)
    .then((result = {}) => {
      result.error ? next(result.error) : res.json(result);
    })
    .catch(error => next(error)); */
  const response = await fetch(`https://rabota.ua/cv/${id}`);
  const html = await response.text();
  const form = $("#resume_holder", html);
  res.json(form.html());
};

const createCvList = ({ body, user }, res, next) => {
  createNewCvList({ userId: user.sub, dataToSave: body })
    .then(({ insertedId }) => {
      const id = insertedId.toString();
      res.json({ id });
    })
    .catch(error => {
      next(error);
    });
};

router.post("/get-by-request", getCvByRequest);
router.post("/get-cv-info", getCvInfo);
router.post("/list", createCvList);
// router.get("/list");
// router.delete("/list", createCvList);
// router.post("/update-list");

module.exports = router;
