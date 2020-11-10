const { Product } = require("./models");
const faker = require("faker");

module.exports = async () => {
  for (let i = 0; i < 40; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.technics(),
      price: faker.commerce.price(),
      stock: faker.random.number(),
      outstanding: faker.random.boolean(),
    });
    await product.save();
  }
};
