const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter') 
const displayData = require('./routes/displaydata');
const dotenv = require('dotenv');
var port = process.env.PORT || 5000;

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: "*"}))
dotenv.config({path: './config.env'});
app.use(express.static("public"))
app.set('view engine', 'ejs');

//----------------connect to mongodb--------------------
const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log(`Connection Successfull`)
}).catch((err)=> console.log(err));

// Routes
app.use(userRouter)
app.use(noteRouter)
app.use(displayData)

app.get("/",(req,res)=>{
    /*let arr =['RFMi3v0TXP8','pMQjg5b-3gE','I_BmeEkfT9k','RFMi3v0TXP8','pMQjg5b-3gE','I_BmeEkfT9k','RFMi3v0TXP8','pMQjg5b-3gE']
    res.render('Data',{ids:arr});*/
    res.render('login');
});

app.listen(port,()=>{
    console.log(`App is listeneing on port ${port}`);
});
