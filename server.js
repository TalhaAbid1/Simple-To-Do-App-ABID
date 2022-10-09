const express = require("express");
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
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
        <form action="/getNewItem" method="POST">
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <button class="btn btn-success">Add New Item</button>
        </div>
      </form>
        </div>
        
        <ul class="list-group pb-5">
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #1</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #2</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
          <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">Fake example item #3</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
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
});

app.post("/getNewItem", async function (req, res) {
  collection.insertOne({ name: req.body.item }, function () {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Great Job</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body style="background-color:wheat;">
    
        <div class="text-center py-3 mt-5">
            <h1 style="color:green;">Data Added To MongoDB Atlas Account Successfully.</h1>
            <a href="/"><button type="button" class="btn btn-info mt-5 mb-3">Back To Home Page</button></a><br>
            <img style="border-radius: 50%; height: 25%; width: 25%;" src="res/Abid.jpg">
        </div>

        <!-- Footer -->
        <footer style="position: fixed; bottom: 0; width: 100%; background-color: skyblue;">
            <div class="footer-copyright text-center py-3">© 2022 Copyright:
                <a href="https://github.com/talhaAbid1" target="_blank" rel="noopener noreferrer"> ABID</a>
            </div>
        </footer>
    
    </body>
    </html>`)
  })
});

app.listen(3000);
