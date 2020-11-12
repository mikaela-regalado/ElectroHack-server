require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const seeder = require("./seeder");
const PORT = process.env.APP_PORT;

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

// seeder();

app.listen(PORT, () =>
  console.log(`App on: ${path.join(__dirname, process.env.APP_PORT)}`)
);
