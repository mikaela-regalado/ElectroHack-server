const db = require("../models");

const productController = {
  list: async (req, res) => {
    const products = await db.Product.find(req.query);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },
};

module.exports = productController;
