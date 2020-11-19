var express = require("express");
const fs = require("fs");
var path = require("path");

var app = express();
var PORT = 6060;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err) =>{if(err) throw err}));

// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
// API Routes
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    notes.push(newNote);
    res.json(notes)
  });
  
  
  // Displays all reservations
app.delete("/api/notes/:id", function(req, res) {
    fs.readFile
  });
  
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    console.log(notes)
  });
  