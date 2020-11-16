const db = require("../models");
const adminToken = require("../utils/adminToken");

const adminController = {
  store: async (req, res) => {
    const admin = await new db.Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isAdmin: true,
    });
    admin.save();
    res.json(adminToken(admin));
  },

  one: async (req, res) => {
    const { email, password } = req.body;
    const admin = await db.Admin.findOne({ email: email });
    if (admin) {
      if (bcrypt.compareSync(password, admin.password)) {
        res.json(adminToken(admin));
      } else {
        res.json("Contraseña incorrecta");
      }
    } else {
      res.json("Datos incorrectos");
    }
  },

  /*   update: async (req, res) => {
    const adminToUpdate = await db.Admin.updateOne(
      { _id: req.body._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true,
      },
      { timestamps: true },
      function (err) {
        if (err) return handleError(err);
      }
    );
    console.log(req.body);
    res.status(200).json(adminToUpdate);
  }, */

  /*   delete: async (req, res) => {
    const userToDelete = await db.User.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );
    console.log(userToDelete);
    res.status(200).json({ message: userToDelete });
  },*/
};

module.exports = adminController;
