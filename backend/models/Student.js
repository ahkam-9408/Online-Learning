const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
    stId: {
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
    collection: 'students'
})

module.exports = mongoose.model('Student', studentSchema)