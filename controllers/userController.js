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
    const userToUpdate = await db.User.updateOne(
      { _id: req.body._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userAddress: req.body.userAddress,
        cellPhone: req.body.cellPhone,
        list_orders: [],
        tokens: [],
      },
      { timestamps: true },
      function (err) {
        if (err) return handleError(err);
      }
    );
    console.log(req.body);
    res.status(200).json({ "producto actualizado": userToUpdate });
  },

  delete: async (req, res) => {
    const userToDelete = await db.User.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );
    console.log(userToDelete);
    res.status(200).json({ message: userToDelete });
  },
};

module.exports = userController;
