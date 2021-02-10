const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lectureSchema = new Schema({
    subject: {
        type: String
    },
    lectureTopic: {
        type: String
    },
    description: {
        type: String
    },
    documentName:{
        type: String
    }
}, {
    collection: 'lectures'
})

module.exports = mongoose.model('Lecture', lectureSchema)