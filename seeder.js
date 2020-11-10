const db = require("./models/mongoose");
const faker = require("faker");

const createProduct = () => {
  for (let i = 0; i < 40; i++) {
    let product = new db.Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.technics(),
      price: faker.commerce.price(),
      stock: faker.random.number(),
      outstanding: faker.random.boolean(),
    });
    product.save();
  }
};
module.exports = createProduct;
