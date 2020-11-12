const db = require("../models");

const categoryController = {
  list: async (req, res) => {
    const categories = await db.Category.find(req.query);
    res.status(200).json(categories);
  },

  one: async (req, res) => {
    const category = await db.Category.findOne({
      slug: req.params.slug,
    }).populate({ path: "productList", options: { limit: 10 } });

    res.status(200).json(category);
  },
};

module.exports = categoryController;
