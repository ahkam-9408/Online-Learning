const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lecturerSchema = new Schema({
    lecId: {
        type: String
    },
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'lecturers'
})

module.exports = mongoose.model('Lecturer', lecturerSchema)