const mongoose = require('mongoose')

const roleShema = new mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER'
    },
    users: [
        { type: mongoose.Types.ObjectId, ref: 'User' }
    ]
}) 

module.exports = mongoose.model('Role', roleShema)