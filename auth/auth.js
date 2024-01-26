const jwt = require('jsonwebtoken')
require("dotenv").config()
const secret = process.env.SECRET

const authenticateToken = (req, res, next) => {
    //Get the value from the header called "Authorization"
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).json({ error: "Access Denied. No token provided"})
    }
    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).json({ error: "Access Denied. Invalid token" })
        req.user = user
    })
}