const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.putSignup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    User.findOne({email})
    .then(user => {
        if (user) return res.status(422).json({message: "User already exists"})
        
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name,
                email,
                password: hashedPassword,
            })
            return user.save()
        })
        .then(user => {
            const token = jwt.sign({
                email: user.email,
                userId: user._id.toString()
            },
            'mysecretkey',
            {expiresIn: '1h'}
        )
            res.status(200).json({
                message: "User created",
                user: {id: user._id, name: user.name, email: user.email},
                token,
                status: 200,
            })
        })
    })
}

exports.postLogin = (req, res, next) => {
    const {email, password} = req.body

    let loadedUser

    User.findOne({email})
    .then(user => {
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        loadedUser = user
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if (!isEqual) {
            return res.status(404).json({message: "Email or password is not correnct"})
        }
        const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'mysecretkey',
            {expiresIn: '1h'}
        )
        res.status(200).json({status: 200, token, user: {id: loadedUser._id, name: loadedUser.name, email: loadedUser.email}})
        
    })
    .catch(err => console.log(err))
}