const mongoose = require("mongoose");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const User = require("./User");

mongoose.connect("mongodb://localhost/db-ElectroHack");

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

module.exports = {
  Category,
  Product,
  Order,
  User,
  mongoose,
};
