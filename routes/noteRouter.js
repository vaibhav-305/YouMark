const router = require('express').Router();
const auth = require('../middleware/auth');
const Notes = require('../models/noteModel');

router.post('/add',auth, async (req,res)=>{
    //console.log(req.body);
    //console.log(req.user);
    try{
        let cnt = await Notes.countDocuments({"userID" : req.user.id, "videoID": req.body.vidID, "contents.timestamp":req.body.timestamp}, { limit: 1 });
        //console.log(Number(cnt))
        if(Number(cnt)!==0)
            return res.status(400).json({status:400,msg: 'Timestamp already exists!'})

        await Notes.updateOne( { "userID" : req.user.id, "videoID": req.body.vidID}, {$addToSet : { "contents" : {"timestamp":req.body.timestamp, "noteContent":req.body.noteContent}}}, {"upsert" : true});
        //await Notes.updateOne({ "userID" : req.user.id, "videoID": req.body.vidID, "contents": { $not: { $elemMatch: { timestamp: req.body.timestamp}}}}, { $push: { "contents": {"timestamp":req.body.timestamp, "noteContent":req.body.noteContent}}}, {"upsert":true})
        res.status(200).json({status: 200, msg: 'Successfully added'})
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 500,msg: err.message})
    }
})

router.post('/getData',auth, async (req,res)=>{
    try{
        let data = await Notes.findOne({userID: req.user.id, videoID: req.body.vidID});
        //console.log('Data: ')
        //console.log(data);
        if(data)
            res.status(200).json({status: 200, data:JSON.stringify(data.contents)});
        else
            res.status(200).json({status: 200, data:'[]'});
    } catch (err) {
        console.log(err);
        res.status(500).json({status:500, msg:'Some error occured'})
    }
})
router.delete('/deleteData', auth ,async (req,res)=>{
    try{
        await Notes.updateOne({userID: req.user.id, videoID: req.body.vidID}, {$pull: {contents: {timestamp: req.body.timestamp}}})
        await Notes.deleteOne({userID: req.user.id, videoID: req.body.vidID, contents:{$size: 0} })
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router
