const express = require('express')
const app = express()
const port = 3500

app.get('/', (req, res) => {
    res.send('It works!')
})
app.get('/stock', (req, res) => {
    res.send('It\'s stock!')
})
app.get('/login', (req, res) => {
    res.send('It\'s login page!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
