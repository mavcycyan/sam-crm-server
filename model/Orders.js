const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    items: [
        {
            item: {
                ref: 'items',
                type: Schema.Types.ObjectId
            },
            name: {
                type: String
            },
            count: Number,
            cost: {
                type: Number
            }
        }
    ],
    processed_by: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    status: String,
    client_name: String,
    client_city: String,
    client_phone: String,
    client_paytype: String,
    client_delivery: String,
    client_comment: String
})

module.exports = mongoose.model('orders', ordersSchema)