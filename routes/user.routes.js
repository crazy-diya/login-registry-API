const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/user.controllers");

router.post(
  "/register",
  check("fname")
    .not()
    .isEmpty()
    .withMessage("First Name want to fill!")
    .isLength({ min: 5 })
    .withMessage("First Name must have more than 5 charactors"),
  check("lname")
    .not()
    .isEmpty()
    .withMessage("Last Name want to fill!")
    .isLength({ min: 5 })
    .withMessage("Last Name must have more than 5 charactors"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email want to fill!")
    .trim()
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter Valied email Address!"),
  check("password") //https://express-validator.github.io/docs/custom-error-messages.html
    .not()
    .isEmpty()
    .withMessage("Cant be Empty")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  userController.registerNewUser
);

router.post(
  "/login",
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email want to fill!")
    .trim()
    .escape()
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter Valied email Address!"),
  check("password") //https://express-validator.github.io/docs/custom-error-messages.html
    .not()
    .isEmpty()
    .withMessage("Cant be Empty")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  userController.loginUser
);

module.exports = router;
