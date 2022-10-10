const express = require("express");
const path = require('path')
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { homedir } = require("os");
const { METHODS } = require("http");

const app = express();
var db;
const client = new MongoClient(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, });
client.connect(async (err) => {
  db = await client.db("todoapp").collection("items");
});

app.use(express.urlencoded({ extended: false }))  
app.get("/", (req, res) => {
    db.find().toArray(async (err, items)=> {
      // Static Method 
      // res.sendFile(path.join(__dirname,'Public/Home.html'))

      // Dynamic method 
      await res.send(`<!DOCTYPE html>
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
          <h1 class="display-4 text-center py-1">To-Do App | <b><i>ABID</i></b></h1>
          
          <div class="jumbotron p-3 shadow-sm">
          <form action="/getNewItem" method="POST">
          <div class="d-flex align-items-center">
            <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-success">Add New Item</button>
          </div>
        </form>
          </div>
          
          <ul class="list-group">
          ${items.map((item)=>{
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                      <span class="item-text"> ${item.name}</span>
                      <div>
                        <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                        <button class="delete-me btn btn-danger btn-sm">Delete</button>
                      </div>
                    </li>`
          }).join("")}
          </ul>
          
        </div>
        <!-- Footer -->
        <footer style="position: fixed; bottom: 0; width: 100%; background-color: skyblue;">
            <div class="footer-copyright text-center py-3">© 2022 Copyright:
                <a href="https://github.com/talhaAbid1"  target="_blank" rel="noopener noreferrer"> ABID</a>
            </div>
        </footer>

      </body>
      </html>`);
    })
});

app.post("/getNewItem", async function (req, res) {
  db.insertOne({ name: req.body.item }, function () {
    // Static Method Of Calling Page
    // res.sendFile(path.join(__dirname,'Public/sample.html'))
    
    // Dynamic Method
    res.redirect('/')
  })
});

app.listen(3000);
