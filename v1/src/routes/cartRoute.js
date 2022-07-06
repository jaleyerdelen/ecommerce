const express = require("express");
const {
  createCart,
  deleteCart,
  getCart,
  getAllCart,
  updateCart,
} = require("../controllers/cartController");
const { verifyToken, userRole } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", verifyToken, userRole("admin"), createCart);
router.put("/:id", verifyToken, userRole("admin"), updateCart);
router.delete("/:id", verifyToken, userRole("admin"), deleteCart);
router.get("/:userId", getCart);
router.get("/", getAllCart);

module.exports = {
  router,
};
