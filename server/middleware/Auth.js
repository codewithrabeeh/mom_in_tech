const jwt = require('jsonwebtoken')

module.exports.isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            throw new Error('Not Authorized')
        }
        const getToken = token.split(' ')
        
        jwt.verify(getToken[1], 'secret')
        next()
    } catch (e) {
        res.send({ message: 'Not Authorized', status: 'Unauthorized' })
    }
}