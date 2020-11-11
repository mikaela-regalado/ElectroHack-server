const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const categorySchema = new Schema({
  code: Number,
  type: String,
  slug: String,
});

categorySchema.virtual("slugify").set(function (type) {
  const slug = slugify(type, { lower: true });
  this.set({ slug });
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
