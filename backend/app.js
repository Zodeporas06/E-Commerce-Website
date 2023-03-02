const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

//To get the data in json file for the database
app.use(express.json());

//Importing Routes
const product = require("./routes/productRoute.js");

app.use("/api/v1", product);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;