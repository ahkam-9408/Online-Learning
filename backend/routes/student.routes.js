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

router.route('/').get((req,res) => {
    studentSchema.find((error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

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

router.route('/delete-student/:id').delete((req, res, next) => {
    studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;