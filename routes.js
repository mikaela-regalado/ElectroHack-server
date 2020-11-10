const checkJwt = require("express-jwt");
const cors = require("cors");

const routes = (app) => {
  app.use(cors());
};
module.exports = routes;
