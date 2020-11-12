const db = require("../models");

const categoryController = {
  all: async (req, res) => {
    const categories = await db.Category.find();
    res.status(200).json(categories);
  },

  one: async (req, res) => {
    const category = await db.Category.findOne({ slug: req.query });
    return category;
  },
};

module.exports = categoryController;
