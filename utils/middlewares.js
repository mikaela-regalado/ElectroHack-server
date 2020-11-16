const jwt = require("express-jwt");

const middlewares = {
  checkJwt: (req, res, next) => {
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    });
  },

  isAuthenticated: (req, res, next) =>
    req.user
      ? req.user.id
        ? next()
        : res.status(401).json({ error: "Identifíquese" })
      : res.status(401).json({ error: "Identifíquese o regístrese" }),

  isAdmin: (req, res, next) =>
    req.user
      ? req.user.isAdmin
        ? next()
        : res
            .status(401)
            .json({ error: "No tiene autorización para realizar esta acción" })
      : res.json({ error: "Identifiquese" }),
};

module.exports = middlewares;
