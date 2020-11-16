const express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");

//Products
router.get("/products", productController.list); //Productos de la home y categoria
router.get("/products/:slug", productController.one); //Producto
router.post("/products", productController.store); //Crear un producto
router.patch("/products", productController.update); //Update un producto
router.delete("/products", productController.delete); //Update un producto

//Categories
router.get("/categories", categoryController.list); //Categorias
router.post("/categories", categoryController.store); //Categorias
router.patch("/categories", categoryController.update); //Categorias
router.delete("/categories", categoryController.delete); //Categorias

//Orders
router.post("/orders", orderController.store); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN
router.get("/orders", orderController.list); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER

module.exports = router;
