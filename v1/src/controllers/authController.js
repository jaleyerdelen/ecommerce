const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, req, res) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: process.env.EXPIRES }
  );
  res.cookie("jwt", token, { httpOnly: true });
  const { password, ...others } = user._doc;
  res.status(statusCode).json({
    status: "success",
    token,
    others,
  });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    sendToken( user, 200, req, res )
  } catch (error) {
    res.status(400).json({
      message: "error creating user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("email couldn't find");
    const compared = await bcrypt.compare(pass, user.password);
    if (compared === false) return res.status(400).send("wrong password ");
  if(user)  return sendToken(user, 200, req, res)
    const { password, ...others } = user._doc;
    res.status(200).json({
      message: "success login",
      others,
    });
  } catch (error) {
    res.status(400).json({
      message: "error login",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
