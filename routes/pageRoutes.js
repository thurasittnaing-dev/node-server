const express = require("express");
const router = express.Router();

// ************ Contact
router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    active: "contact",
  });
});

// ************ Redirect Contact
router.get("/contact-us", (req, res) => {
  res.redirect("/contact");
});

module.exports = router;
