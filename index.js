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
const uri = `mongodb+srv://${username}:${password}@cluster0.lgdlxzl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const database = client.db("victor-task-manager");
    const tasks = database.collection("task");
    app.post("/insert", async (req, res) => {
      const task = req.body;
      const result = await tasks.insertOne(task);
      console.log(result);
      res.send(result);
    });
    app.get("/mytasks", async (req, res) => {
      const email = req.query.email;
      const query = {
        // user: email
        isComplete: false,
      };
      const result = await tasks.find(query).toArray();
      res.send(result);
    });
    app.patch("/completed", async (req, res) => {
      const id = req.query.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          isComplete: true,
        },
      };
      const result = await tasks.updateOne(filter, updateDoc);
      res.send(result);
      console.log(result);
      console.log(id);
    });
    app.patch("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: {
          title: req.body.title,
          details: req.body.details,
        },
      };
      const result = await tasks.updateOne(filter, updateDoc);
      res.send(result);
    });
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await tasks.deleteOne(filter);
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Hello World!This is ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
