const jwt = require('jsonwebtoken');
const JWT_Secret = 'mai@hu#don'

const fetchUser = (req, res, next) => {
    const authToken = req.header('auth-token')
    try {
        const data = jwt.verify(authToken, JWT_Secret)
        req.user = data.id
        next()
    } catch (error) {
        res.status(500).send("Unauthorized authtoken !")
    }
}

module.exports = fetchUser