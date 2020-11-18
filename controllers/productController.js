const { Category } = require("../models");
const db = require("../models");
const categoryController = require("./categoryController");

const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_S3_BUCKET_REGION });

const s3 = new AWS.S3({
  apiVersion: process.env.AWS_S3_API_VERSION,
  accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
});

/* const form = formidable({
  multiples: true,
  keepExtensions: true,
});

form.parse(req, async (err, fields, files) => {
  
  const ext = path.extname(files.avatar.path);
  const newFileName = `image_${Date.now()}${ext}`;
  
  const params = {
    ACL: "public-read",
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `avatars/${newFileName}`,
    ContentType: files.avatar.type,
    Body: fs.createReadStream(files.avatar.path),
  };
  await s3.upload(params).promise();
}); */

const productController = {
  list: async (req, res) => {
    let products = [];
    if (req.query.outstanding) {
      products = await db.Product.find(req.query).limit(12);
    } else {
      products = await db.Product.find(req.query);
    }
    res.status(200).json(products);
  },

  one: async (req, res) => {
    const product = await db.Product.findOne({ slug: req.params.slug });
    res.status(200).json(product);
  },

  store: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    /* form.parse(req, async (err, fields, files) => {
      const ext = path.extname(files.avatar.path);
      const newFileName = `image_${Date.now()}${ext}`;

      const params = {
        ACL: "public-read",
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `avatars/${newFileName}`,
        ContentType: files.avatar.type,
        Body: fs.createReadStream(files.avatar.path),
      };
      await s3.upload(params).promise();
    }); */
    /* const form = formidable({
      multiples: true,
      uploadDir: path.dirname(__dirname) + "/public/img", //comentar para poder entrar sin as3
      keepExtensions: true,
    }); */
    form.parse(req, async (err, fields, files) => {
      const ext = path.extname(files.image.path);
      const newFileName = `image_${Date.now()}${ext}`;

      const params = {
        ACL: "public-read",
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `products/${newFileName}`,
        ContentType: files.type,
        Body: fs.createReadStream(files.image.path),
      };
      await s3.upload(params).promise();
      /*    });
    form.parse(req, async (err, fields, files) => { */
      console.log("FILES: ", files);
      console.log("FIELDS: ", fields);
      console.log("BUCKET: ", process.env.AWS_S3_BUCKET_NAME);
      const { name, description, price, stock, outstanding, category } = fields;
      //const image = "/img/" + path.basename(files.image.path);
      const newProduct = new db.Product({
        name,
        description,
        price,
        stock,
        outstanding,
        slugify: name,
        category,
        image: newFileName,
      });
      let categ = await Category.findById(category);
      categ.productList.push(newProduct._id);
      categ.save();
      await newProduct.save();

      res.status(200).json(newProduct);
    });
  },

  update: async (req, res) => {
    const productToEdit = await db.Product.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        stock: req.body.stock,
        outstanding: req.body.outstanding,
        slugify: req.body.name,
        category: req.body.category,
      },
      function (err) {
        if (err) return handleError(err);
      }
    );
    category = await Category.findById(req.body.category);
    category.productList.push(productToEdit._id);
    category.save();
    res.status(200).json(productToEdit);
  },

  delete: async (req, res) => {
    const productToDelete = await db.Product.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );
    res.status(200).json({ message: productToDelete });
  },
};

module.exports = productController;

/* userUpdate: async (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.dirname(__dirname) + "/public/img", //comentar para poder entrar sin as3
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const { firstName, lastName, userName, description } = fields; //req.body;
    console.log(firstName, lastName, userName, description);
    const image = "/img/" + path.basename(files.image.path); //comentar para poder entrar sin as3
    const user = await User.findByIdAndUpdate(req.user.id, {
      firstName,
      lastName,
      userName,
      description,
      image, //comentar para poder entrar sin as3
    });
    res.status(200).json(user);
  });
}, */
