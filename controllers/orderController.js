const db = require("../models");

const orderController = {
  new: async (req, res) => {
    const { buyer, list_products, state } = req.body;
    const order = await db.Order.new({
      buyer: buyer,
      list_products: list_products,
      state: state,
    });
    res.status(200).json(order);
  },

  many: async (req, res) => {
    const orders = await db.Order.find({ buyer: query.buyer._id });
    res.status(200).json(orders);
  },
};

module.exports = orderController;
