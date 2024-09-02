const express = require("express");
const { host, port } = require("./config/server");

let morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const uri =
  "mongodb+srv://tsnmgdb:paSSword@cluster0.uszbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Routes
const blogRoutes = require("./routes/blogRoutes");
const pageRoutes = require("./routes/pageRoutes");

mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected connected");

    app.listen(port, () => {
      console.log(`Project is running at ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error - ", err);
  });

// View Engine Folders
app.set("views", "./views");

// View Engine Type
app.set("view engine", "ejs");

// Morgan Dev
app.use(morgan("dev"));

// Static Path
app.use(express.static("public"));

// Home Page
app.get("/", (req, res) => {
  res.render("home", {
    name: "Thura Sitt Naing",
    title: "Home",
    active: "home",
  });
});

app.use("/blogs", blogRoutes);

app.use(pageRoutes);

//  CV
app.get("/cv", (req, res) => {
  res.sendFile("./public/resume.pdf", { root: __dirname });
});

//  404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
    active: "",
  });
});
