const express = require('express');
const router = express.Router();
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')


router.post('/login',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.pass;
    try {
        if(!email || !password)
            return res.status(422).json({status:422,msg: 'Plz fill all the feilds properly', status: "422"});

        const user = await Users.findOne({email: email, password: password})
        if(!user) return res.status(400).json({status:400,msg: "Username or Password incorrect"})

        // if login success create token
        const payload = {id: user._id, name: user.username}
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "30d"})

        return res.json({status:200,token:token})
    } catch (err) {
        console.log(err);
        return res.status(500).json({status:500,msg: err.message})
    }
});

router.post('/register',async (req,res)=>{
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.pass;
    try {
        if(!username || !email || !password)
            return res.status(422).json({status:422,msg: 'Plz fill all the feilds properly', status: "422"});

        const user = await Users.findOne({email: email})
        if(user) 
           return res.status(400).json({status:400,msg: "The email already exists."})

        const newUser = new Users({
            username: username,
            email: email,
            password: password
        })
        await newUser.save()
        res.json({status:200,msg: "Sign up Success"})
    } catch (err) {
        return res.status(500).json({status:500,msg: err.message})
    }
});

router.post('/verify',async (req, res)=>{
    const token=req.body.token;
    //console.log(token);
    try{
        if(!token)
            return res.send(false);

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) =>{
            if(err){ 
                console.log(err)
                return res.send(false)
            }

            const user = await Users.findById(verified.id)
            //console.log("User: ");
            //console.log(user);
            if(!user) return res.send(false)

            return res.send(true)
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})

module.exports = router;