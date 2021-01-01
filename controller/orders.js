const Orders = require('../model/Orders')

module.exports.getList = async function(req, res) {
    const data = await Orders.find({})

    if(data && data.length > 0) {
        res.json(data)
    } else {
        res.json({ message : 'Orders not found' })
    }
}

module.exports.getOrder = async function(req, res) {
    const data = await Orders.findOne({ _id : req.params.id })

    if(data) {
        res.json(data)
    } else {
        res.json({ message : 'Order not found' })
    }
}

module.exports.addOrder = async function(req, res) {
    try {
        const order = await Orders({
            date : Date.now(),
            items : req.body.items,
            processed_by: req.body.processed_by,
            status: req.body.status,
            client_name: req.body.client_name,
            client_city: req.body.client_city,
            client_phone: req.body.client_phone,
            client_paytype: req.body.client_paytype,
            client_delivery: req.body.client_delivery,
            client_comment: req.body.client_comment
        })
        await order.save((err, order) => {
            if(err) {
                console.log(err)
            } else {
                res.json({ message : `Order ${order._id} created!` })
            }
        })
    } catch(e) {
        console.error(e)
    }
}

module.exports.updateOrder = async function(req, res) {
    try {
        const order = await Orders.findOneAndUpdate({
            _id : req.params.id,
            items : null,
            processed_by: null,
            status: req.query.status,
            client_name: req.query.client_name,
            client_city: req.query.client_city,
            client_phone: req.query.client_phone,
            client_paytype: req.query.client_paytype,
            client_delivery: req.query.client_delivery,
            client_comment: req.query.client_comment
        })
        res.json({ message : `Order ${order._id} updated` })
    } catch(e) {
        console.error(e)
    }
}

module.exports.deleteOrder = async function(req, res) {
    try {
        const order = await Orders.findOneAndRemove({ _id: req.params.id })
        res.json({ message : `Order ${order._id} deleted` })
    } catch(e) {
        console.error(e)
    }
}