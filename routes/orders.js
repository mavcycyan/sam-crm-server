const express = require('express')
const app = express()

const orders = require('../controller/orders')

app.get('/', orders.getList)
app.get('/page/:page', orders.getList)
app.get('/count', orders.countOrders)
app.get('/:id', orders.getOrder)
app.post('/', orders.addOrder)
app.patch('/:id', orders.updateOrder)
app.delete('/:id', orders.deleteOrder)

module.exports = app