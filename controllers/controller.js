const db = require("../models");

module.exports = {
    // get all of our posts
    findPosts: function(req,res) {
        db.Message
            .findAll({
                include: [db.User]
            })
            .then((results) => {
                res.json(results)
        })
            .catch((err) => {
                throw err
            })
    },

    // adding a new post with the current logged in users id (in state)
    postPost: function(req,res) {
        console.log(req.body);
        db.Message
            .create({
                message_content: req.body.message_content,
                admin_status: req.body.admin_status,
                UserId: req.body.UserId,
            })
            .catch((err) => {
                throw err
            })
    },

    // delete a post from our specified user
    deletePost: function(req, res) {
        db.Message
            .destroy({
                where: {
                    UserId: req.params.id,
                    createdAt: req.body.createdAt
                }
            })
            .then((dbData) => {
                res.json(dbData)
            })
            .catch((err) => {
                throw err
            })
    },

    // grabs a full list of our tenants from the database
    getAllTenants: function(req,res) {
        db.Tenant
            .findAll({
                include: [db.User]
            })
            .then((results) => {
                res.json(results)
            })
            .catch((err) => {
                throw err
            })
    },

    // update some tenant information
    updateTenant: function(req,res) {
        console.log(req.body);
        db.Tenant
            .update({
                real_name: req.body.tenant.real_name,
                unit_number: req.body.tenant.unit_number,
                rent_amount: req.body.tenant.rent_amount,
                rent_paid: req.body.tenant.rent_paid,
                contact: req.body.tenant.contact,
                lease: req.body.tenant.lease
            }, {
                where: {
                    id: req.body.tenant.id
                }
            }).then((dbData) => {
                console.log("Updating tenant info in DB at ID: " + req.body.tenant.id)
                res.json(dbData);
            })
    }
}