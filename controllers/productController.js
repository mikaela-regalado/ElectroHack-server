const db = require("../models");
const formidable = require("formidable");
const imagenesS3 = require("../utils/imagenesS3");

const s3 = imagenesS3.configS3();

const productController = {
  list: async (req, res) => {
    let products = [];
    if (req.query.outstanding) {
      products = await db.Product.find(req.query).limit(12);
    } else {
      products = await db.Product.find(req.query);
    }
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },

  store: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      const newFileName = await imagenesS3.upload(files, s3);

      const { name, description, price, stock, outstanding, category } = fields;
      const newProduct = new db.Product({
        name,
        description,
        price,
        stock,
        outstanding,
        slugify: name,
        category,
        image: newFileName,
      });
      let categ = await db.Category.findById(category);
      categ.productList.push(newProduct._id);
      categ.save();
      await newProduct.save();

      res.status(200).json(newProduct);
    });
  },

  update: async (req, res) => {
    const productToEdit = await db.Product.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        outstanding: req.body.outstanding,
        slugify: req.body.name,
        category: req.body.category,
      },
      function (err) {
        if (err) return handleError(err);
      }
    );
    category = await Category.findById(req.body.category);
    category.productList.push(productToEdit._id);
    category.save();
    res.status(200).json(productToEdit);
  },

  delete: async (req, res) => {
    const productToDelete = await db.Product.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
      }
    );
    res.status(200).json({ message: productToDelete });
  },
};

module.exports = productController;
