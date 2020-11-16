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

  store: async (req, res) => {
    // console.log(req.body);
    const newCategory = new db.Category({
      code: req.body.code,
      type: req.body.type,
      slug: req.body.slug,
      description: req.body.description,
      image: req.body.image,
      productList: [],
    });

    await newCategory.save();

    res.status(200).json({ message: newCategory });
  },

  update: async (req, res) => {
    const categoryToEdit = await db.Category.updateOne(
      { code: req.body.code },
      {
        type: req.body.type,
        image: req.body.image,
        slug: req.body.slug,
        description: req.body.description,
        productList: db.Category.productList,
      },
      function (err) {
        if (err) return handleError(err);
      }
    );
    // console.log(req.body);
    res.status(200).json({ "caegoría actualizado": categoryToEdit });
  },

  delete: async (req, res) => {
    const categoryToDelete = await db.Category.deleteOne(
      { code: req.body.code },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );

    console.log(categoryToDelete);
    res.status(200).json({ message: categoryToDelete });
  },
};

module.exports = categoryController;
