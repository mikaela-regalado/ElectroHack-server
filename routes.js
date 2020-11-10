const checkJwt = require("express-jwt");
const cors = require("cors");
const seeder = require("./seeder");
const productController = require("./controllers/productController");

const routes = (app) => {
  app.use(cors());

  //Products
  app.get("/products", productController.all); //Productos de la home
};
module.exports = routes;
