const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, req, res) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, isAdmin: user.isAdmin, role: user.role },
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
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).json({
      message: "Success created",
      user,
    });
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
    return sendToken(user, 200, req, res);
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
