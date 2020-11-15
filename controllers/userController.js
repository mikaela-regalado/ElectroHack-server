const db = require("../models");
const reqToken = require("../utils/reqToken");

const userController = {
  store: async (req, res) => {
    const user = await new db.User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userAddress: req.body.userAddress,
      cellPhone: req.body.cellPhone,
    });
    user.save();
    res.json(reqToken(user));
  },

  one: async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ email: email });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.json(reqToken(user));
      } else {
        res.json("Contraseña incorrecta");
      }
    } else {
      res.json("Datos incorrectos");
    }
  },

  update: async (req, res) => {
    const productToEdit = await db.Product.updateOne(
      { _id: req.body._id },
      { name: req.body.name, description: req.body.description }
    );
    console.log(productToEdit);
    res.status(200).json({ "salió?": productToEdit });
  },
};

module.exports = userController;
