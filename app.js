const express = require("express");
const { host, port } = require("./config/server");
const Blog = require("./models/Blogs");

let morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const uri =
  "mongodb+srv://tsnmgdb:paSSword@cluster0.uszbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("database connected connected");

    app.listen(port, () => {
      console.log(`Project is running at ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log("EEE ", err);
  });

// View Engine Folders
app.set("views", "./views");

// View Engine Type
app.set("view engine", "ejs");

// Morgan Dev
app.use(morgan("dev"));

// Static Path
app.use(express.static("public"));

// ************ Home View
app.get("/", (req, res) => {
  res.render("home", {
    name: "Thura Sitt Naing",
    title: "Home",
    active: "home",
  });
});

// ************ Blogs View
app.get("/blogs", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });

  res.render("blog", {
    blogs: blogs,
    title: "Blog",
    active: "blog",
  });
});

// ************ Blog Delete
app.post("/blogs/:id/delete", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.redirect("/blogs");
  } catch (e) {
    console.log(e);
    next();
  }
});

// ************ Blog Detail
app.get("/blogs/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);

    res.render("show", {
      blog: blog,
      title: "Blog Detail",
      active: "blog",
    });
  } catch (e) {
    console.log(e);
    next();
  }
});

// ************ Contact View
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    active: "contact",
  });
});

// ************ Contact View
app.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

// ************ CV View
app.get("/cv", (req, res) => {
  res.sendFile("./public/resume.pdf", { root: __dirname });
});

// ************ Create Blog
app.get("/add-blog", async (req, res) => {
  let blogs = await Blog.find();

  let blog = new Blog({
    title: `Title ${blogs.length + 1}`,
    intro: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. ${
      blogs.length + 1
    }`,
    body: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. `,
  });

  await blog.save();
  res.redirect("/blogs");
});

// ************ 404 View
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
    active: "",
  });
});
