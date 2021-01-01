const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const AuthRoute = require('./routes/auth')
const ItemsRoute = require('./routes/items')
const OrdersRoute = require('./routes/orders')
const SettingsRoute = require('./routes/settings')
const keys = require('./config/keys')

const port = 3500

mongoose.connect(keys.db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Connected to data base')
    })
    .catch(error => {
        console.log(error);
    })

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', AuthRoute)
app.use('/api/list', ItemsRoute)
app.use('/api/orders', OrdersRoute)
app.use('/api/settings', SettingsRoute)


app.listen(port, () => {
    console.log(`Working on http://localhost:${port}`)
})
