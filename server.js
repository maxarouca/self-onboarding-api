require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Grid = require("gridfs-stream");
const connection = require("./app/db");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const app = express();

let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("files");
});

const corsOptions = {
  // origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.set("superSecret", "self2021");

// Start route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to self onboarding application." });
});

// Retrieve a image uploaded
app.get("/api/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

// Delete a image uploaded
app.delete("/api/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

// Registering the application routes

require("./app/routes/register.routes")(app);
require("./app/routes/auth.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
