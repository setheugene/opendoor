const router = require("express").Router();
const controller = require("../../controllers/controller.js");

// /api/all/x routes
router.route("/posts")
    .get(controller.findPosts)
    .post(controller.postPost);


router.route("/posts/:id")
    .delete(controller.deletePost)

    
router.route("/tenants")
    .get(controller.getAllTenants);

module.exports = router;