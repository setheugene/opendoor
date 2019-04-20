const router = require("express").Router();
const controller = require("../../controllers/controller.js");

// /api/x routes
router.router("/")
    .get(controller.findPosts)
    