let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Lecturer Model
let lecturerSchema = require('../models/Lecturer');

// CREATE Lecturer
router.route('/create-lecturer').post((req, res, next) => {
    lecturerSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

router.route('/').get((req,res) => {
    lecturerSchema.find((error,data) => {
        if(error){
            return next(error);
        } else{
            res.json(data);
        }
    })
})

//Get lecturer by username
router.route('/get-lecturer/:username').get((req,res) => {
    lecturerSchema.find({"username":req.params.username}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/get-lecturer/:username/:password').get((req,res) => {
    lecturerSchema.find({"username":req.params.username,"password":req.params.password}, (error,data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

router.route('/delete-lecturer/:id').delete((req, res, next) => {
    lecturerSchema.findByIdAndRemove(req.params.id, (error, data) => {
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