let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let adminSchema = require('../models/Admin');

// CREATE Admin
router.route('/create-student').post((req, res, next) => {
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

module.exports = router;