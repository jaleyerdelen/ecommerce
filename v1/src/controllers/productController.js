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
    const { title, desc, img, categories, size, color, price } = req.body;
    product.title = title;
    product.desc = desc;
    product.img = img;
    product.categories = categories;
    product.size = size;
    product.color = color;
    product.price = price;

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
    const qCategory = req.query.category;
    console.log(qCategory);
    let product;
    if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      product === undefined;
      return res.status(404).send("please enter a value");
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
