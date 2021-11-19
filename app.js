const express = require("express");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const {
  getFileList,
  uploadFile,
  downloadFile,
} = require("./controllers/files");
const app = express();
// set ejs as view engine
app.set("view engine", "ejs");
// app use static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// router
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/files", getFileList);
app.get("/uploads/:name", downloadFile);

app.post("/", uploadFile);


app.listen(5000, () => {
  console.log("your server is up in port 5000....");
});
