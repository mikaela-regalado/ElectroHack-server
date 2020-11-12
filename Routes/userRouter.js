const express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");
//const middlewares = require("../utils/middlewares");
const checkJwt = require("express-jwt");

//Products
router.get("/products", productController.list); //Productos de la home
router.get("/products/:slug", productController.one); //Producto

//Categories
router.get("/categories", categoryController.list); //Categorias
router.get("/categories/:slug", categoryController.one); //Categoria

//Usuario
router.post("/users", userController.store); //Crear Usuario
router.get("/users", userController.one); //Login de usuario

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
//Orders
router.post("/orders", orderController.store); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN
router.get("/orders", orderController.list); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER

module.exports = router;
