const express = require("express");
const router = express.Router();
const userController = require("../../controller/usercontroller");

// @route GET api/users/test
// @desc get all users
// @access Public
router.get("/", (req, res) => res.json({ msg: "users works" }));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userController.registerUser);

// @route POST api/users/login
// @desc Login user / Returning JWT Token
// @access Public
router.post("/login", userController.loginUser);

module.exports = router;
