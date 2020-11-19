const mongoose = require("mongoose");
const Category = require("./Category");
const Product = require("./Product");
const Order = require("./Order");
const User = require("./User");
const Admin = require("./Admin");

mongoose.connect(
  "mongodb+srv://root:root@twitter.27auu.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

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
  Admin,
  mongoose,
};
