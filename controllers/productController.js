const db = require("../models");

const productController = {
  all: async (req, res) => {
    console.log(req.query);
    const products = await db.Product.find(req.query);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    console.log(req.query);
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },
};

module.exports = productController;
