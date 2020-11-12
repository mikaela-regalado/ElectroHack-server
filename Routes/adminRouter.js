const express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");

//Products
router.get("/products", productController.list); //Productos de la home y categoria
router.get("/products/:slug", productController.one); //Producto

//Categories
router.get("/categories", categoryController.list); //Categorias

//Orders
router.post("/orders", orderController.store); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN
router.get("/orders", orderController.list); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER

module.exports = router;
