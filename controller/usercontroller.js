const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (req, res, next) => {
  const { name, email, password, propix } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
      propix
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    const createdUser = await user.save();
    return res.json(createdUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
