let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let studentSchema = require('../models/Student');

// CREATE Student
router.route('/create-student').post((req, res, next) => {
    studentSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

//Get student by username
router.route('/get-student/:username').get((req,res) => {
    studentSchema.find({"username":req.params.username}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/get-student/:username/:password').get((req,res) => {
    studentSchema.find({"username":req.params.username,"password":req.params.password}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

module.exports = router;