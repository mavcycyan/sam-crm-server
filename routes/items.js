const express = require('express')
const app = express()

const list = require('../controller/items')

app.get('/', list.getList)
app.get('/:id', list.getItem)
app.post('/', list.addItem)
app.patch('/:id', list.updateItem)
app.delete('/:id', list.deleteItem)

module.exports = app