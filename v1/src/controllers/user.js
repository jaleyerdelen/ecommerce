const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id );
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

module.exports = {
  updateUser,
};
