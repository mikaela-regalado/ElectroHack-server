const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const categorySchema = new Schema({
  code: { type: Number, unique: true },
  type: { type: String, unique: true },
  slug: String,
  description: String,
  image: String,
  productList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

categorySchema.virtual("slugify").set(function (type) {
  const slug = slugify(type, { lower: true });
  this.set({ slug });
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
