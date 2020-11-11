const db = require("../models");

const productController = {
  all: async (req, res) => {
    console.log(req.query);
    /* http://localhost:8000/products?category.code=1 Para filtrar por categoria*/
    const products = await db.Product.find(req.query);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },
};

module.exports = productController;
