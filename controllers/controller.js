const db = require("../models");

module.exports = {
    findPosts: function(req,res) {
        db.Message
            .findAll({})
            .then((results) => {
                res.json(results)
        })
            .catch((err) => {
                throw err
            })
    },

    postPost: function(req,res) {
        db.Message
            .create({
                message_content: req.body.message_content,
                admin_status: req.body.admin_status,
                id: req.body.id
            })
    }
}