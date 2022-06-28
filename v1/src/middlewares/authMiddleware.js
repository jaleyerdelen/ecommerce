const jwt = require("jsonwebtoken")
const User = require("../models/User")
const verifyToken = async(req, res, next) => {
 try {
    
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if (token === undefined) return res.status(400).json({message:"unauthorized"})
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) res.status(400).json({ message: "token is not valid"})
        const user = await User.findById(user.id)
        req.user = user
        next()
    })
    } catch {
    res.status(400).json({ message: "error"})
    }
    }


module.exports = {
    verifyToken
}