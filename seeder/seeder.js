const path = require("path");
const categories = path.resolve(__dirname, "categories.csv");
console.log(categories);
const csv = require("csvtojson");
const db = require("../models");

const seeder = () => {
  csv()
    .fromFile(categories)
    .then((jsonObj) => {
      jsonObj.map(({ code, type, description, image }) => {
        const newCategory = new db.Category({
          code,
          type,
          description,
          slugify: type,
          image: `${process.env.URL_S3}categories/${image}`,
          productList: [],
        });
        newCategory.save();
        console.log(newCategory);
      });
    });
};

module.exports = seeder;
/* // Async / await usage
const jsonArray=await csv().fromFile(categories); */
