const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
   isAdmin: {
    type: Boolean,
    default: false,
  },

},
{ timestamps: true, versionKey: false }, 

);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
