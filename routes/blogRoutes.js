const express = require("express");
const router = express.Router();
const Blog = require("./../models/Blogs");

// ************ Index
router.get("", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });

  res.render("blog", {
    blogs: blogs,
    title: "Blog",
    active: "blog",
  });
});

// ************ Store
router.get("/create", async (req, res) => {
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

// ************ Show
router.get("/:id", async (req, res, next) => {
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

// ************ Destroy
router.post("/:id/delete", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.redirect("/blogs");
  } catch (e) {
    console.log(e);
    next();
  }
});

module.exports = router;
