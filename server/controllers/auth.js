const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Role = require('../models/role')

exports.putSignup = async (req, res, next) => {
    try {
        const {email, password, name} = req.body

        const user = await User.findOne({email})
        if (user) return res.status(422).json({message: "User already exists"})
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const userRole = await Role.findOne({value: "USER"})

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            roles: [userRole.value]
        })
        await newUser.save()
        userRole.users.push(newUser)
        userRole.save()

        const token = jwt.sign({
            email: newUser.email,
            userId: newUser._id.toString(),
            roles: [userRole.value]
        },
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        )

        res.status(200).json({
            message: "User created",
            user: {id: newUser._id, name: newUser.name, email: newUser.email, roles: newUser.roles},
            token,
        })
    }
    catch(err) {
        console.log(err)
        res.status(422).json({message: "Signup failed"})
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        let loadedUser

        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message: "User not found"})
        loadedUser = user

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) return res.status(404).json({message: "Email or password is not correnct"})

        const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
                roles: loadedUser.roles
            },
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        )
        res.status(200).json({
            token,
            user: {
                id: loadedUser._id,
                name: loadedUser.name,
                email: loadedUser.email,
                roles: loadedUser.roles
            }
        })
            
    }
    catch(err) {
        console.log(err)
        res.status(400).json({message: "Login failed"})
    }
}

exports.postAuthMe = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) return res.status(400).json({message: 'Token has expired'})
        return res.status(200).json({user})            
    }
    catch(err) {
        res.status(400).json({message: "Login failed"})
    }
}