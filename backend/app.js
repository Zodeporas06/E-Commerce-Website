const express = require("express");
//const bodyParser = require("body-parser");

const app = express();

//app.use(bodyParser.urlencoded({extended: false}));

//To get the data in json file for the database
app.use(express.json());

const product = require("./routes/productRoute.js");

app.use("/api/v1", product);

module.exports = app;