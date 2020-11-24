require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const seeder = require("./seeder/seeder");
const PORT = process.env.APP_PORT;
const userRouter = require("./Routes/userRouter");
const adminRouter = require("./Routes/adminRouter");

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/admin", adminRouter);
app.use(userRouter);

/* seeder
  .admin()
  .then(() => seeder.categories())
  .then(() => seeder.products()); */

app.listen(PORT, () =>
  console.log(`App on: ${path.join(__dirname, process.env.APP_PORT)}`)
);
