const { Product, Category } = require("./models");
const faker = require("faker");

module.exports = async () => {
  const imgAndSound = new Category({ code: 0, type: "Imagen y Sonido" });
  imgAndSound.slugify = imgAndSound.type;
  imgAndSound.save();
  const climatization = new Category({ code: 1, type: "Climatización" });
  climatization.slugify = climatization.type;
  climatization.save();
  const cleaning = new Category({ code: 2, type: "Limpieza" });
  cleaning.slugify = cleaning.type;
  cleaning.save();
  const kitchen = new Category({ code: 3, type: "Cocina" });
  kitchen.slugify = kitchen.type;
  kitchen.save();
  const others = new Category({ code: 4, type: "Otros" });
  others.slugify = others.type;
  others.save();

  for (let i = 0; i < 40; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      image: faker.image.technics(),
      price: faker.commerce.price(),
      stock: faker.random.number(),
      outstanding: faker.random.boolean(),
    });
    product.slugify = product.name;
    const code = Math.floor(Math.random() * 5);
    product.category = await Category.findOne({ code: code });
    product.save();
  }
};
