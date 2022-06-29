const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum:["admin", "client"],
    default: "client"
  }
},
{ timestamps: true, versionKey: false }, 

);

const User = mongoose.model("User", UserSchema);
module.exports = User;
