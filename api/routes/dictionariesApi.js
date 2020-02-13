const express = require("express");
const router = express.Router();

const dictionaryServices = require("../services/users/dictionaryServices");

const connectDb = require("../database/connectMongoDb");

const getCities = (req, res) => {
  //todo up to date data from api

  dictionaryServices
    .getCities()
    .then(cities => res(cities))
    .catch(err => next(err));
};

router.get("/cities", getCities);

module.exports = router;
