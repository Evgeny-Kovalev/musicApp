const jwt = require('jsonwebtoken')

module.exports = roles => (req, res, next) => {
    if (req.method === 'OPTIONS') next()
    try {
        const token = req.get('Authorization').split(' ')[1]

        if (!token) return res.status(403).json({message: "User is not logged in"})

        const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
        let hasRole = false

        userRoles.forEach(role => {
            if (roles.includes(role)) hasRole = true
        })
        if (!hasRole) return res.status(400).json({massage: 'No access'})
        next()
    }
    catch(e) {
        console.log(e)
        return res.status(403).json({message: "User is not logged in"})
    }
}