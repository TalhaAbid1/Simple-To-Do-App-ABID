const express = require("express");
// const path = require('path')
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId, MongoDBNamespace } = require("mongodb");
// const { homedir } = require("os");
// const { METHODS } = require("http");
// const { Script } = require("vm");

const app = express();
var db;

app.use(express.static("public"))  


const client = new MongoClient(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, });
client.connect(async (err) => {
  db = await client.db("todoapp").collection("items");
  app.listen(3000);
  console.log("why");
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))  

app.get("/", (req, res) => {
    db.find().toArray(function(err, items){
      // Static Method 
      // res.sendFile(path.join(__dirname,'Public/Home.html'))

      // Dynamic method 
      res.send(`<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple To-Do App | ABID </title>
        <link rel="icon" type="image/x-icon" href="res/favicon.ico">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      </head>
      <body style="background-color:wheat;">
        <div class="container">
          <h1 class="display-4 text-center py-1">To-Do App | <b><i> <a href="https://github.com/talhaAbid1"  target="_blank" rel="noopener noreferrer"> ABID</a></i></b></h1>
          
          <div class="jumbotron p-3 shadow-sm">
          <form id=form-field action="/getNewItem" method="POST">
          <div class="d-flex align-items-center">
            <input id=input-field name="item" autofocus autocomplete="off" placeholder="Enter Task Here" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-success">Add New Item</button>
          </div>
        </form>
          </div>
          <ul id=ul-field class="list-group">
          </ul>
          </div>

          <script>
            let itemz = ${JSON.stringify(items)}
          </script>

        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <Script src="/browser.js"></Script>
      </body>
    </html>`);
    })
});

app.post("/getNewItem", function (req, res) {
  db.insertOne({ name: req.body.input }, function (err, info) {
      res.json({ _id: info.insertedId.toString(), name: req.body.input })
  })
});

app.post('/update',function(req, res){
  db.findOneAndUpdate({_id: ObjectId(req.body.id)},{$set:{name:req.body.updated}},function(){
    res.send("Successfully Updated")
  })
})

app.post('/delete' , function(req,res){
  db.deleteOne({_id: ObjectId(req.body.id)},function(){
    res.send("Successfully Deleted")
  })
})  