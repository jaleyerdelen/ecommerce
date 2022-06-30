const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined)
      return res.status(400).json({ message: "unauthorized" });

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(400).json({ message: "token is not valid" });
      req.user = user;
      next()
    });
  } catch {
    res.status(400).json({ message: "error" });
  }
};

const userRole = (...userRole) => {
  return (req, res, next) => {
    userRole.includes(req.user.role)
      ? next()
      : res.status(400).json({ message: "you can't see this page" });
  };
};

module.exports = {
  verifyToken,
  userRole,
};
