const jwt = require("express-jwt");

const middlewares = {
  checkJwt: (req, res, next) => {
    console.log("AHORA ACA");
    jwt({
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    });

    return next();
  },
};

module.exports = middlewares;
