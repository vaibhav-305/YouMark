const router = require('express').Router();
const Users = require('../models/userModel');
const Notes = require('../models/noteModel');

router.post('/displayData',async (req,res)=>{
    let email = req.body.email;
    let pass = req.body.pass;
    if(!email || !pass)
        return res.status(404).send('Enter credentials first to see bookmarks')
    try{    
        const user = await Users.findOne({email: email, password: pass})
        if(!user) return res.status(400).send("No user with given Username and Password exists!")

        const tempdata = await Notes.find({userID: user._id},{videoID: 1});

        let data = []
        for(let i=0;i<tempdata.length;i++)
            data.push(tempdata[i].videoID);
        //console.log(data)
        res.render('Data',{ids:data,name:user.username})
        
    }catch(err){
        console.log(err);
        res.status(500).send('Some error occured, try again !')
    }
    //let arr =['RFMi3v0TXP8','pMQjg5b-3gE','I_BmeEkfT9k','RFMi3v0TXP8','pMQjg5b-3gE','I_BmeEkfT9k','RFMi3v0TXP8','pMQjg5b-3gE']
    //res.render('Data',{ids:arr});
});

module.exports = router