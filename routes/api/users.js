const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../../controller/usercontroller");
const auth = require("../../middleware/auth");

// @route GET api/users/test
// @desc get all users
// @access Public
router.get("/", (req, res) => res.json({ msg: "users works" }));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  userController.registerUser
);

// @route POST api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  userController.loginUser
);

// @route GET api/users/current
// @desc Returning current user
// @access Private
router.get("/current", auth, userController.currentUser);

module.exports = router;
