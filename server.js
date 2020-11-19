var express = require("express");
const fs = require("fs");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3001;
let tempID = 1

app.use(express.static(path.join('/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json"), (err) => { if (err) throw err }));

// HTML Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// API Routes
app.get("/api/notes", function (req, res) {
  return (res.json(notes));
});

app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  req.body.id = tempID;
  tempID++;
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), (err) => { if (err) throw err });
  res.sendFile(path.join(__dirname, "public/notes.html"))
});


// Delete Note
app.delete("/api/notes/:id", function (req, res) {

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
    } 


  }
  fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => { if (err) throw err });
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
  console.log(notes)
  console.log(tempID)
});
