const express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");

//Products
router.get("/products", productController.list); //Productos de la home
router.get("/products/:slug", productController.one); //Producto

//Categories
router.get("/categories", categoryController.list); //Categorias
router.get("/categories/:slug", categoryController.one); //Categoria

//Orders
router.post("/orders", orderController.store); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN
router.get("/orders", orderController.list); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER

//Usuario
router.post("/users", userController.store); //Crear Usuario

module.exports = router;
