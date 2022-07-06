const Cart = require("../models/Cart");

const createCart = async (req, res) => {
  try {
    const cart = await new Cart(req.body);
    const savedCart = await cart.save();
    res.status(200).json({
      message: "created cart",
      savedCart,
    });
  } catch {
    res.status(400).json({
      message: "Cart error",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    const savedCart = await cart.save();
    res.status(200).json({
      message: "updated cart",
      savedCart,
    });
  } catch (err) {
    res.status(400).json({ message: "error updating cart" });
    err;
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart) {
      await Cart.deleteOne(cart);
      res.status(200).json({
        message: "cart deleted successfully",
        cart,
      });
    } else {
      res.status(404).json({
        message: "cart not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "cart could not be deleted",
      error,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      message: "success cart",
      cart,
    });
  } catch (err) {
    res.status(400).json({ message: "error cart" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cart = await Card.find();
    res.status(200).json({
      message: "success all cart",
      cart,
    });
  } catch (err) {
    res.status(400).json({
      message: "error cart",
    });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart,
};
