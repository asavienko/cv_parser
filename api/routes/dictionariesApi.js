const express = require("express");
const router = express.Router();
const dictionaryServices = require("../services/dictionaries/dictionaryServices");

const getCities = (req, res, next) => {
  //todo up to date data from api

  dictionaryServices
    .getCities()
    .then(cities => res.json(cities))
    .catch(err => next(err));
};

router.get("/cities", getCities);

module.exports = router;
