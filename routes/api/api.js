const router = require("express").Router();
const controller = require("../../controllers/controller.js");

// /api/all/x routes
router.route("/messages")
    .get(controller.findPosts)


router.route("/messages/:id")
    .delete(controller.deletePost)
    .post(controller.postPost);
    
router.route("/tenants")
    .get(controller.getAllTenants);

module.exports = router;