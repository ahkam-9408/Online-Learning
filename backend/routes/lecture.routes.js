let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Lecturer Model
let lectureSchema = require('../models/Lecture');

// CREATE Lecturer
router.route('/create-lecture').post((req, res, next) => {
    lectureSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Lecture
router.route('/').get((req, res) => {
    lectureSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;