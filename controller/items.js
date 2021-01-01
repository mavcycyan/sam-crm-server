const Items = require('../model/Items')

module.exports.getList = async function(req, res) {
    const data = await Items.find({})

    if(data && data.length > 0) {
        res.json(data)
    } else {
        res.json({ message : 'No items founded' })
    }
}

module.exports.getItem = async function(req, res) {
    const data = await Items.findOne({ _id: req.params.id })

    if(data) {
        res.json(data)
    } else {
        res.json({ message : 'No item founded' })
    }
}

module.exports.addItem = async function(req, res) {

    let sysName = (req.body.sys_name) ?
        req.body.sys_name :
        req.body.name

    sysName = sysName.toLowerCase()
    sysName = sysName.replace(/ /g, '_')

    const data = await Items.findOne({ sys_name: sysName })

    if(!data) {
        const item = new Items({
            sys_name : sysName,
            name : req.body.name,
            price : (req.body.price) ? req.body.price : 0,
            stock_count: (req.body.stock_count) ? req.body.stock_count : 0
        })
        await item.save( (err, item) => {
            if(err) {
                console.log('err', err)
            }
            console.log('Saved item ', item)
            res.json({ message : `'${item.name}' item created` })
        })
    } else {
        res.json({ message : 'Item already exists' })
    }
}

module.exports.updateItem = async function(req, res) {
    try {
        let sysName = (req.body.sys_name) ?
            req.body.sys_name :
            req.body.name

        sysName = sysName.toLowerCase()
        sysName = sysName.replace(/ /g, '_')

        const item = await Items.findOneAndUpdate(
            {_id : req.params.id},
            {
                sys_name : sysName,
                name : req.body.name,
                price : (req.body.price) ? req.body.price : 0,
                stock_count: (req.body.stock_count) ? req.body.stock_count : 0
            },
            {new : true}
            )
        res.json({ message : `Item '${item.name}' updated!` })
    } catch(e) {
        console.error(e)
    }
}

module.exports.deleteItem = async function(req, res) {
    try {
        const item = await Items.findOneAndRemove({_id : req.params.id})
        res.json({ message : `Item '${item.name}' deleted!` })
    } catch(e) {
        console.error(e)
    }
}