const db = require("../models");

const orderController = {
  store: async (req, res) => {
    const { buyer, list_products, totalPrice } = req.body;
    const order = await new db.Order({
      buyer: buyer,
      list_products: list_products,
      state: "Sin pagar",
      totalPrice: totalPrice,
      createdAt: Date.now(),
      created: Date.now(),
    });
    order.save();
    res.status(200).json(order);
  },

  list: async (req, res) => {
    const orders = await db.Order.find(req.query).populate("list_products._id");
    res.status(200).json(orders);
  },

  one: async (req, res) => {
    const order = await db.Order.findById(req.params.id).populate(
      "list_products._id"
    );
    res.status(200).json(order);
  },

  update: async (req, res) => {
    const orderToEdit = await db.Order.updateOne(
      { _id: req.body._id },
      {
        buyer: req.body.buyer,
        list_products: req.body.list_products,
        image: req.body.image,
        state: req.body.state,
        paymentMethod: req.body.paymentMethod,
      },
      function (err) {
        if (err) return handleError(err);
      }
    );
    console.log(req.body);
    res.status(200).json(orderToEdit);
  },

  delete: async (req, res) => {
    const orderToDelete = await db.Order.deleteOne(
      { _id: req.body._id },
      function (err) {
        if (err) return handleError(err);
        // deleted at most one tank document
      }
    );
  },
};

module.exports = orderController;
