const db = require("../models");

const categoryController = {
  list: async (req, res) => {
    const categories = await db.Category.find(req.query).populate("products");
    res.status(200).json(categories);
  },

  one: async (req, res) => {
    const category = await db.Category.findOne({ slug: req.query });
    return category;
  },
};

module.exports = categoryController;
