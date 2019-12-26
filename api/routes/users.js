const express = require("express");
const router = express.Router();
const userServices = require("../services/users");

router.post("/authenticate", authenticate);
router.post("/create", create);
router.get("/", getAll);


module.exports = router;

function authenticate(req, res, next) {
  userServices
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userServices
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function create(req, res, next) {
  userServices
    .create(req.body)
    .then(() => res.json({ message: "User is created successfully" }))
    .catch(err => next(err));
}
