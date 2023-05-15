const express = require("express");
const upload = require("express-fileupload");
const NodeStl = require("./stl-cal");

const app = express();
app.use(upload());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  if (req.files) {
    console.log("file ", req.files.file);
    var file = req.files.file;
    var stl = new NodeStl(file.data, { density: 1.04 });
    console.log(stl.volume + "cm^3"); // 21cm^3
    console.log(stl.weight + "gm"); //  1gm
    console.log(stl.boundingBox, "(mm)"); // [60,45,50] (mm)
    console.log(stl.area, "(m)"); // 91.26 (m)
    console.log(stl.centerOfMass, "(mm)"); // [30,22.5,25] (mm)
  }
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000 ...");
});
