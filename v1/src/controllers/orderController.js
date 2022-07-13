const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = await new Order(req.body);
    const savedOrder = await order.save();
    res.status(200).json({
      message: "created order",
      savedOrder,
    });
  } catch {
    res.status(400).json({
      message: "order error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const savedOrder = await order.save();
    res.status(200).json({
      message: "updated order",
      savedOrder,
    });
  } catch (err) {
    res.status(400).json({ message: "error updating order" });
    err;
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne(order);
      res.status(200).json({
        message: "order deleted successfully",
        order,
      });
    } else {
      res.status(404).json({
        message: "order not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "order could not be deleted",
      error,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json({
      message: "success order",
      order,
    });
  } catch (err) {
    res.status(400).json({ message: "error order" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      message: "success all order",
      order,
    });
  } catch (err) {
    res.status(400).json({
      message: "error order",
    });
  }
};

const stats = async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({ 
        message: 'Success status',
        income
    })
  } catch {
    res.status(500).json({
      message: "error order",
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
  stats,
};
