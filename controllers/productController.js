const db = require("../models");

const productController = {
  list: async (req, res) => {
    let query = req.query;
    if (query.slug) {
      const category = await db.Category.findOne(req.query);
      query = { category: category._id };
    }
    const products = await db.Product.find(query);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },
};

module.exports = productController;
