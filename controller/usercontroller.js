const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//load user model
const User = require("../models/User");

exports.registerUser = async (req, res) => {
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    //Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        propix: user.propix
      }
    };

    //Sign token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          success: true,
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.currentUser = async (req, res) => {
  return res.json(req.user);
};
