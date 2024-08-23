const express = require("express");
const { host, port } = require("./config/server");
const app = express();

// View Engine Setup
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

app.get("/cv", (req, res) => {
  res.sendFile("./assets/resume.pdf", { root: __dirname });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Project is running at ${host}:${port}`);
});
