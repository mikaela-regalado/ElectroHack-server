const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
  list_products: [
    {
      cantidad: Number,
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  state: String,
  paymentMethod: String,
  createdAt: {
    type: Date,
    set: (date) => moment(date).format("YY"),
    get: (date) => moment(date).format("YY"),
    alias: "created",
  },
});

orderSchema.virtual("created").get(function () {
  return moment(Date.now()).format();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
