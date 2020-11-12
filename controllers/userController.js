const db = require("../models");

const userController = {
  store: async (req, res) => {
    const user = await new db.User({
      firstName: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      userAddress: req.body.userAddress,
      cellPhone: req.body.cellPhone,
    });
    user.save();
    res.json(user);
  },
};

module.exports = userController;
