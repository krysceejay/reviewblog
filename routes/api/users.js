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

module.exports = router;
