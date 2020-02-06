const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc get all users
// @access Public
router.get('/', (req, res) => res.json({msg: "posts works"}));

module.exports = router;
