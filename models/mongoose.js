const mongoose = require("mongoose");
const Product = require("./Product");
const Order = require("./Order");
const User = require("./User");
const Category = require("./Category");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

mongoose.connection
  .once("open", () =>
    console.log("¡Conexión con la base de datos establecida!")
  )
  .on("error", (error) => console.log(error));

module.exports = {
  mongoose,
  Order,
  User,
  Product,
  Category,
};
