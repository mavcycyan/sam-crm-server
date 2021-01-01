const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('It\'s stock action!')
})

module.exports = app