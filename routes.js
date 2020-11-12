const checkJwt = require("express-jwt");
const cors = require("cors");
const productController = require("./controllers/productController");
const categoryController = require("./controllers/categoryController");
const userController = require("./controllers/userController");
const routes = (app) => {
  app.use(cors());

  //Products
  app.get("/products", productController.all); //Productos de la home y categoria
  app.get("/products/:slug", productController.one); //Producto

  //Categories
  app.get("/categories", categoryController.all); //Categorias

  //Usuario
  app.post("/users", userController.store); //Crear Usuario
};

module.exports = routes;
