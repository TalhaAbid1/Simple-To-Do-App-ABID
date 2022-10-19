const express = require("express");
const dotenv = require("dotenv");
const sanitizer = require("sanitize-html")
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
var db;

app.use(express.static("public"))  


const client = new MongoClient(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, });
client.connect(async (err) => {
  db = await client.db("todoapp").collection("items");
  app.listen(3000);
  console.log("why");
});

app.use(passwordProtection)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  

function passwordProtection(req, res, next){
  res.set('WWW-Authenticate','basic realm="todp app"')
  if(req.headers.authorization  == "Basic QUJJRDphbHBoYQ=="){
    next()
  }
  else{
    res.status(401).send(`<h1>Authentication Failed<br>UserName & Password Required To LogIn.</h1>`)
  }
}

app.get("/",(req, res) => {
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
  let sanitizeFielddata = sanitizer(req.body.input, {allowedTags:[], allowedAttributes:{}})
  db.insertOne({ name: sanitizeFielddata }, function (err, info) {
      res.json({ _id: info.insertedId.toString(), name: req.body.input })
  })
});

app.post('/update',function(req, res){
  let sanitizeFielddata = sanitizer(req.body.input, {allowedTags:[], allowedAttributes:{}})
  db.findOneAndUpdate({_id: ObjectId(req.body.id)},{$set:{name: sanitizeFielddata}},function(){
    res.send("Successfully Updated")
  })
})

app.post('/delete' , function(req,res){
  db.deleteOne({_id: ObjectId(req.body.id)},function(){
    res.send("Successfully Deleted")
  })
})
