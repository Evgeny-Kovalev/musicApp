const User = require('../models/user')
const Song = require('../models/song')
const Role = require('../models/role')

// exports.getUser = (req, res, next) => {
    
// }

exports.getRoles = async (req, res, next) => {
    const roles = await Role.find().select('_id value')
    return res.status(200).json(roles)
}

exports.getRolesWithUsers = async (req, res, next) => {
    const roles = await Role.find().select('_id value users').populate({
        path: 'users', model: 'User', select: '_id name email'
    })
    return res.status(200).json(roles)
}

exports.postAddRoleToUser = async (req, res, next) => {
    const {role, user} = req.body
    try {
        const userDB = await User.findById(user._id)
        const roleDB = await Role.findById(role._id)
        
        roleDB.users = roleDB.users.filter(user => user.toString() !== userDB._id.toString())
        roleDB.users.push(userDB)
        
        userDB.roles = userDB.roles.filter(role => role.toString() !== roleDB.value.toString())
        userDB.roles.push(roleDB.value)
        
        await roleDB.save()
        await userDB.save()
        
        return res.status(200).json({message: `Role "${role.value}" added successfully`})
    }
    catch(err) {
        return res.status(400).json({message: "Error"})
    }
}

exports.deleteRoleFromUser = async (req, res, next) => {
    const {role, user} = req.body
    try {
        const userDB = await User.findById(user._id)
        const roleDB = await Role.findById(role._id)
        
        roleDB.users = roleDB.users.filter(user => user.toString() !== userDB._id.toString())
        userDB.roles = userDB.roles.filter(role => role.toString() !== roleDB.value.toString())
        
        await userDB.save()
        await roleDB.save()
        
        return res.status(200).json({message: `Role "${role.value}" removed successfully`})
    }
    catch(err) {
        return res.status(400).json({message: "Error"})
    }
}
