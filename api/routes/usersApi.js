const express = require("express");

const router = express.Router();
const userServices = require("../services/users/userServices");

const signUp = (req, res, next) => {
  userServices
    .create(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => next(err));
};

const signIn = (req, res, next) => {
  userServices
    .authenticate(req.body)
    .then(user =>
      user && user.token
        ? res.json(user)
        : res.status(400).json({ err: "Email или пароль введены не верно" })
    )
    .catch(err => next(err));
};

const getCurrentUser = ({ user }, res, next) => {
  userServices
    .getById(user.sub)
    .then(users => res.json(users))
    .catch(err => next(err));
};

const getAll = (req, res, next) => {
  userServices
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
};

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);

router.get("/get-current-user", getCurrentUser);
router.get("/", getAll);

module.exports = router;
