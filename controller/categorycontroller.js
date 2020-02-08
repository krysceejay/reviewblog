const { validationResult } = require("express-validator");

//load category model
const Category = require("../models/Category");

//Add Category
exports.addCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  try {
    category = new Category({
      name
    });

    const createdCategory = await category.save();
    return res.json(createdCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
