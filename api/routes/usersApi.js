const express = require("express");
const router = express.Router();
const userServices = require("../services/users/userServices");
const joiMiddleware = require("../middleware/joi");
const { userSignUp, userSignIn } = require("../validationSchemas/schemas");

const signUp = (req, res, next) => {
  userServices
    .create(req.body)
    .then(() => res.json({ message: "User is created successfully" }))
    .catch(err => next(err));
};

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

router.post("/sign-in", joiMiddleware(userSignIn, "body"), signIn);
router.post("/sign-up", joiMiddleware(userSignUp, "body"), signUp);
router.get("/", getAll);

module.exports = router;
