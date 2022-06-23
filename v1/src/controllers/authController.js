const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    user.save();
    res.status(200).json({
      message: "created user",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "error creating user",
      error,
    });
  }
};

module.exports = {
  createUser,
};
