const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    /*  buyer: {​​​​ type: Schema.Types.ObjectId, ref: "User" }, */
    /* list_products: [{​​​​ type: Schema.Types.ObjectId, ref: "Product" }], */
    state: String,
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
