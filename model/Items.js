const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemsSchema = new Schema({
    sys_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type : Number,
        default : 0
    },
    stock_count: {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('items', itemsSchema)