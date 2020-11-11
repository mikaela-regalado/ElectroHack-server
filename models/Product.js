const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
//const Category = require("./Category");

const categorySchema = new Schema({
  code: Number,
  type: String,
});

const productSchema = new Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  stock: Number,
  outstanding: Boolean,
  slug: String,
  category: categorySchema,
});

productSchema.virtual("slugify").set(function (name) {
  const slug = slugify(name, { lower: true });
  this.set({ slug });
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
