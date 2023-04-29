const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

//To get the data in json file for the database
app.use(express.json());

//Importing Routes
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoutes.js");

app.use("/api/v1", product);
app.use("/api/v1", user);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;