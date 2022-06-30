const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    user.name = req.body.name;
    user.save();
    res.status(200).json({
      message: "updated user",
      user,
    });
  } catch (err) {
    res.status(400).json({ message: "error updating user" });
    err;
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne(user);
      res.status(200).json({
        message: "User deleted successfully",
        user,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "User could not be deleted",
      error,
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
};
