const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

//To get the data in json file for the database
app.use(express.json());
app.use(cookieParser());

//Importing Routes
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoutes.js");

app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;