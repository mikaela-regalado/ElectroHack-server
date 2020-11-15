const { Category } = require("../models");
const db = require("../models");

const productController = {
  list: async (req, res) => {
    const products = await db.Product.find(req.query).limit(10);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },

  create: async (req, res) => {
    // console.log(req.body);
    const newProduct = new db.Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      outstanding: true,
      slug: "post-fake",
      category: "5fad419f264ed2144cd6d440",
    });
    await newProduct.save();

    res.status(200).json({ salio: "salio" });
  },
};

module.exports = productController;
