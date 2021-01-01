const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../model/Users')

module.exports.login = async function(req, res) {
    const data = await Users.findOne({login: req.body.login})

    if(data) {
        const passwordResult = bcrypt.compareSync(req.body.password, data.password)
        if(passwordResult) {
            res.json({ message : 'Logged in!' })
        } else {
            res.status(401).json({ message: 'Password incorrect!' })
        }
    } else {
        res.status(404).json({ message: 'User not found!'})
    }
}

module.exports.register = async function(req, res) {
    const data = await Users.findOne({login: req.body.login})

    if(!data) {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const emailExist = await Users.findOne({email: req.body.email})

        if(!emailExist) {
            const user = new Users({
                login: req.body.login,
                password: bcrypt.hashSync(password, salt),
                email: req.body.email,
                name: (req.body.name) ? req.body.name : req.body.login
            })
            await user.save((err, user) => {
                if(err) {
                    console.log('err', err)
                }
                console.log('Saved user ', user)
                res.json({ message : 'Registered user '+req.body.login+'!' })
            })
        } else {
            res.status(409).json({ message : 'This email already exists!' })
        }
    } else {
        res.status(409).json({ message : 'User already exists!' })
    }
}

module.exports.update = async function(req, res) {
    try {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = await Users.findOneAndUpdate(
                {_id: req.params.id},
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, salt)
                },
                {new: true}
            )
        res.json({ message : `User ${user.login} was updated!` })
    } catch(e) {
        console.error(e)
    }
}

module.exports.delete = async function(req, res) {
    try {
        const user = await Users.findOneAndRemove({
            _id: req.params.id
        })
        res.json({message: `User ${user.login} was deleted!`})
    } catch(e) {
        console.error(e)
    }
}