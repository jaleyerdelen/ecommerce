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

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({
      message: "success user",
      others,
    });
  } catch (err) {
    res.status(400).json({ message: "error user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find(req.query);
    res.status(200).json({
      message: "success all users",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: "error users",
    });
  }
};

const userStatus = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      message: "error",
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  userStatus,
};
