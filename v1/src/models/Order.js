const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
userId: {
    type: String,
    required: true
},
products: [
    {
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }
],
amount: {
    type: Number,
    required: true
},
adress: {
    type: Object,
    required: true
},
status: {
    type: String,
    default: "pending"
}
},
{ timestamps: true, versionKey: false }, 
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
