const path = require("path");
const categories = path.resolve(__dirname, "categories.csv");
const products = path.resolve(__dirname, "products.csv");
const admin = path.resolve(__dirname, "admin.csv");
const csv = require("csvtojson");
const db = require("../models");

const seeder = async () => {
  await csv()
    .fromFile(admin)
    .then((jsonObj) => {
      jsonObj.map(async ({ firstName, lastName, email, password, isAdmin }) => {
        const newAdmin = await new db.Admin({
          firstName,
          lastName,
          email,
          password,
          isAdmin,
        });
        await newAdmin.save();
        console.log(newAdmin);
      });
    });

  await csv()
    .fromFile(categories)
    .then((jsonObj) => {
      jsonObj.map(async ({ code, type, description, image }) => {
        const newCategory = await new db.Category({
          code,
          type,
          description,
          slugify: type,
          image: `categories/${image}`,
          productList: [],
        });
        await newCategory.save();
        console.log(newCategory);
      });
    });

  await csv()
    .fromFile(products)
    .then((jsonObj) => {
      jsonObj.map(
        async ({
          name,
          description,
          image,
          price,
          stock,
          outstanding,
          code,
        }) => {
          const product = await new db.Product({
            name,
            description,
            image: `products/${image}`,
            price,
            stock,
            outstanding,
            slugify: name,
          });

          const category = await db.Category.findOne({ code: code });
          category.productList.push(product._id);
          await category.save();
          product.category = category._id;
          await product.save();
          console.log(product);
        }
      );
    });
};

module.exports = seeder;
