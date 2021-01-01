const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,

})

module.exports = mongoose.model('users', usersSchema)