const checkJwt = require("express-jwt");
const cors = require("cors");
const productController = require("./controllers/productController");
const categoryController = require("./controllers/categoryController");
const orderController = require("./controllers/orderController");

const routes = (app) => {
  app.use(cors());

  //Products
  app.get("/products", productController.many); //Productos de la home y categoria
  app.get("/products/:slug", productController.one); //Producto

  //Categories
  app.get("/categories", categoryController.all); //Categorias

  //Orders
  app.post("/orders", orderController.new); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN
  app.get("/orders", orderController.many); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER
};

module.exports = routes;
