const db = require("../models");

const categoryController = {
  all: async (req, res) => {
    const categories = await db.Category.find();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;
