const checkJwt = require("express-jwt");
const cors = require("cors");
const productController = require("./controllers/productController");
const categoryController = require("./controllers/categoryController");

const routes = (app) => {
  app.use(cors());

  //Products
  app.get("/products", productController.all); //Productos de la home y categoria
  app.get("/products/:slug", productController.one); //Producto

  //Categories
  app.get("/categories", categoryController.all); //Categorias
};

module.exports = routes;
