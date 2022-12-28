// const express = require("express");
// const app = express();
// var cors = require("cors");
// const port = 5000;
// app.use(cors());

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const { query } = require("express");
app.use(cors());
app.use(express.json());

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

app.get("/", (req, res) => {
  res.send("Hello World!This is ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
