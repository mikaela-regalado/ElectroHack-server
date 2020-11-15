const { Category } = require("../models");
const db = require("../models");

const productController = {
  list: async (req, res) => {
    const products = await db.Product.find(req.query).limit(10);
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },

  create: async (req, res) => {
    // console.log(req.body);
    const newProduct = new db.Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      stock: req.body.stock,
      outstanding: true,
      slug: "post-fake",
      category: "5fad419f264ed2144cd6d440",
    });
    await newProduct.save();

    res.status(200).json({ salio: "salio" });
  },

  update: async (req, res) => {
    const productToEdit = await db.Product.updateOne(
      { _id: req.body._id },
      { name: req.body.name, description: req.body.description }
    );
    console.log(productToEdit);
    res.status(200).json({ "salió?": productToEdit });
  },

  delete: async (req, res) => {
    const productToDelete = await db.Product.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );

    console.log(productToDelete);
    res.status(200).json({ entro: productToDelete });
  },
};

module.exports = productController;
