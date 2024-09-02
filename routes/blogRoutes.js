const express = require("express");
const router = express.Router();
const BlogController = require("./../controllers/BlogController");

//  Index
router.get("", BlogController.index);

//  Store
router.get("/create", BlogController.store);

//  Show
router.get("/:id", BlogController.show);

//  Destroy
router.post("/:id/delete", BlogController.destroy);

module.exports = router;
