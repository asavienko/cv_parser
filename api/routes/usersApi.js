const express = require("express");
const router = express.Router();
const userServices = require("../services/users");

const signIn = (req, res, next) => {
  userServices
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
};

const getAll = (req, res, next) => {
  userServices
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};

const signUp = (req, res, next) => {
  userServices
    .create(req.body)
    .then(() => res.json({ message: "User is created successfully" }))
    .catch(err => next(err));
};

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.get("/", getAll);

module.exports = router;
