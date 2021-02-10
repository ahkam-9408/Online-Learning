let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let adminSchema = require('../models/Admin');

// CREATE Admin
router.route('/create-admin').post((req, res, next) => {
    adminSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Admin
router.route('/').get((req, res) => {
    adminSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// READ Admin using username and password
router.route('/get-admin/:username/:password').get((req,res) => {
    adminSchema.find({"username":req.params.username,"password":req.params.password}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

module.exports = router;