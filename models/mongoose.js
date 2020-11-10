const mongoose = require("mongoose");
const productSchema = require("./Product");
const orderSchema = require("./Order");
const userSchema = require("./User");
const categorySchema = require("./Category");

mongoose.connect(process.env.DATABASE);

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model("Category", categorySchema);

module.exports = {
  mongoose,
  Order,
  User,
  Product,
  Category,
};
