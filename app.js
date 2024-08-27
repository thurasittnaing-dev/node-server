const express = require("express");
const { host, port } = require("./config/server");
const { blogs } = require("./data/data");
const app = express();

// View Engine Setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    name: "Thura Sitt Naing",
    title: "Home",
    active: "home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    blogs: blogs,
    title: "About",
    active: "about",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    active: "contact",
  });
});

app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

app.get("/cv", (req, res) => {
  res.sendFile("./assets/resume.pdf", { root: __dirname });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});

app.listen(port, () => {
  console.log(`Project is running at ${host}:${port}`);
});
