const db = require("../models");

const orderController = {
  store: async (req, res) => {
    const { buyer, list_products, totalPrice } = req.body;
    const order = await new db.Order({
      buyer: buyer,
      list_products: list_products,
      state: "Sin pagar",
      totalPrice: totalPrice,
      createdAt: Date(),
    });
    order.save();
    res.status(200).json(order);
  },

  list: async (req, res) => {
    const orders = await db.Order.find(req.query);
    res.status(200).json(orders);
  },

  one: async (req, res) => {
    const order = await db.Order.findById(req.params.id).populate(
      "list_products._id"
    );
    res.status(200).json(order);
  },
};

module.exports = orderController;
