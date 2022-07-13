const express = require("express");
const {
  createOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  stats
} = require("../controllers/orderController");
const { verifyToken, userRole } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", verifyToken, userRole("admin"), createOrder);
router.get("/income", verifyToken, userRole("admin"), stats)
router.put("/:id", verifyToken, userRole("admin"), updateOrder);
router.delete("/:id", verifyToken, userRole("admin"), deleteOrder);
router.get("/:userId", getOrder);
router.get("/", getAllOrder);

module.exports = {
  router,
};
