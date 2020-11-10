const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
      name: String,
      description: String,
      image: String,
      price: Number,
      stock: Number,
      outstanding: Boolean,
      slug: String,
      category: {​​​​ type: Schema.Types.ObjectId, ref: "Category" },
        },
    { timestamps: true }
  ); 

  modules.exports = productSchema