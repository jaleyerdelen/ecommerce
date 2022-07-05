const User = require("../models/User");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await new Product(req.body);
    const savedProduct = await product.save();
    res.status(200).json({
      message: "created product",
      savedProduct,
    });
  } catch {
    res.status(400).json({
      message: "Product error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.title = req.body.title;
    product.desc = req.body.desc;
    product.img = req.body.img;
    product.categories = req.body.categories;
    product.size = req.body.size;
    product.color = req.body.color;
    product.price = req.body.price;

    const savedProduct = await product.save();
    res.status(200).json({
      message: "updated product",
      savedProduct,
    });
  } catch (err) {
    res.status(400).json({ message: "error updating product" });
    err;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne(product);
      res.status(200).json({
        message: "Product deleted successfully",
        product,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Product could not be deleted",
      error,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      message: "success product",
      product,
    });
  } catch (err) {
    res.status(400).json({ message: "error product" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    console.log(qCategory);
    let product;
    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      product = await Product.find();
    }

    res.status(200).json({
      message: "success all product",
      product,
    });
  } catch (err) {
    res.status(400).json({
      message: "error product",
    });
  }
};


module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
};
