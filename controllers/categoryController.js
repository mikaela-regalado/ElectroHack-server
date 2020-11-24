const db = require("../models");
const formidable = require("formidable");
const imagenesS3 = require("../utils/imagenesS3");

const categoryController = {
  list: async (req, res) => {
    const categories = await db.Category.find({}).sort("code");
    res.status(200).json(categories);
  },

  one: async (req, res) => {
    const category = await db.Category.findOne({
      slug: req.params.slug,
    }).populate({ path: "productList", options: { limit: 10 } });

    res.status(200).json(category);
  },

  store: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const newFileName = await imagenesS3.upload(files, s3);

      const { code, type, slug, description, productList } = fields;
      const newCategory = new db.Category({
        code,
        type,
        slugify: slug,
        description,
        productList,
        image: newFileName,
      });

      await newCategory.save();

      res.status(200).json(newProduct);
    });
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
