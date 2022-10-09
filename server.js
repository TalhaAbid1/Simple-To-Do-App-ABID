const express = require("express");
var path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
var collection;
const client = new MongoClient(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, });
client.connect(async (err) => {
  collection = await client.db("todoapp").collection("items");
});

app.use(express.urlencoded({ extended: false }))  
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'Public/Home.html'))
});

app.post("/getNewItem", async function (req, res) {
  collection.insertOne({ name: req.body.item }, function () {
    res.sendFile(path.join(__dirname,'Public/sample.html'))
  })
});

app.listen(3000);
