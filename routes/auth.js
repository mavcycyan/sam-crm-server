const express = require('express')
const app = express()

const auth = require('../controller/auth')

app.post('/login', auth.login)
app.post('/register', auth.register)
app.patch('/update/:id', auth.update)
app.delete('/delete/:id', auth.delete)

module.exports = app