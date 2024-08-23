const express = require("express");
const { host, port } = require("./config/server");

const app = express();

// Home Route
app.get("/", (req, res) => {
  res.sendFile("./views/home.view.html", { root: __dirname });
});

// About Route
app.get("/about", (req, res) => {
  res.sendFile("./views/about.view.html", { root: __dirname });
});

// Contact Route
app.get("/contact", (req, res) => {
  res.sendFile("./views/contact.view.html", { root: __dirname });
});

// Contact Us Redirect Route
app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

// CV Route
app.get("/cv", (req, res) => {
  res.sendFile("./assets/resume.pdf", { root: __dirname });
});

// 404 Route
app.use((req, res) => {
  res.status(404);
  res.sendFile("./views/404.view.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Project is running at ${host}:${port}`);
});
