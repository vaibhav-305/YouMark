const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const auth =  (req, res, next) =>{
    try {
        const token = req.body.token
        if(!token) return res.status(400).json({status: 400,msg: "Invalid Authentication"})

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) =>{
            if(err) return res.status(400).json({status: 400,msg: "Authorization not valid."})

            const nuser = await Users.findById(user.id)
            if(!nuser) return res.status(404).json({status: 404,msg: 'User doesnt exist!'})

            req.user = user;
            next()
        })
    } catch (err) {
        return res.status(500).json({status: 500,msg: err.message})
    }
}

module.exports = auth