const { Category } = require("../models");
const db = require("../models");
const categoryController = require("./categoryController");

const productController = {
  list: async (req, res) => {
    let products = [];
    if (req.query.outstanding) {
      products = await db.Product.find(req.query).limit(10);
    } else {
      products = await db.Product.find(req.query);
    }
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },

  store: async (req, res) => {
    const newProduct = new db.Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      outstanding: req.body.outstanding,
      slugify: req.body.name,
    });
    category = await Category.findById(req.body.category);
    category.productList.push(newProduct._id);
    category.save();
    newProduct.category = category._id;
    await newProduct.save();

    res.status(200).json(newProduct);
  },

  update: async (req, res) => {
    const productToEdit = await db.Product.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        outstanding: req.body.outstanding,
        slugify: req.body.name,
        category: req.body.category,
      },
      function (err) {
        if (err) return handleError(err);
      }
    );
    console.log(req.body);
    category = await Category.findById(req.body.category);
    category.productList.push(productToEdit._id);
    category.save();
    res.status(200).json(productToEdit);
  },

  delete: async (req, res) => {
    const productToDelete = await db.Product.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );

    console.log(productToDelete);
    res.status(200).json({ message: productToDelete });
  },
};

module.exports = productController;
