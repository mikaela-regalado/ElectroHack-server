const express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const orderController = require("../controllers/orderController");
const adminController = require("../controllers/adminController");
const middlewares = require("../utils/middlewares");
const checkJwt = require("express-jwt");

router.post("/token", adminController.one); //Login de Admin

router.use(
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  middlewares.isAdmin
);

//Admin
router.post("/", adminController.store); //Crear Admin
//router.patch("/", adminController.update); //Update de Admin
//router.delete("/", adminController.delete); //Elimina un Admin

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
router.patch("/orders", orderController.update); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER
router.delete("/orders", orderController.delete); //Nueva orden. PRECISAMOS AGREGAR EL CHECKEO DEL TOKEN: BUYER

module.exports = router;
