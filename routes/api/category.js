const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const categoryController = require("../../controller/categorycontroller");
const auth = require("../../middleware/auth");

// @route GET api/category/test
// @desc get all categories
// @access Public
router.get("/", (req, res) => res.json({ msg: "category works" }));

// @route POST api/categories/addcategory
// @desc Add category
// @access Public
router.post(
  "/addcategory",
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  categoryController.addCategory
);

module.exports = router;
