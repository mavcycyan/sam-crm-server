const Orders = require('../model/Orders')

module.exports.countOrders = async function(req, res) {
    const ordersCount = await Orders.find({}).countDocuments();
    res.json(ordersCount)
}

module.exports.getList = async function(req, res) {
    const limit = parseInt(req.query.limit);
    const skipList = (req.query.page) ? (req.query.page - 1) * limit : 0;
    const data = await Orders.find({}).sort({date: 'desc'}).skip(skipList).limit(limit)

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
        const order = await Orders.findOneAndUpdate(
            {_id : req.params.id},
            {
                items : req.body.items,
                processed_by: null,
                status: req.body.status,
                client_name: req.body.client_name,
                client_city: req.body.client_city,
                client_phone: req.body.client_phone,
                client_paytype: req.body.client_paytype,
                client_delivery: req.body.client_delivery,
                client_comment: req.body.client_comment
            },
            {new: true}
        )
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