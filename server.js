import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import Data from './data.js'
import Videos from './dbModel.js'



//app config
const test='hellllo';
const app= express();
const port= process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*"),
    res.setHeader("Access-Control-Allow-Headers","*"),
    next();
});


//db config
const connection_url= process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(connection_url,{
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true   
}).then(res => console.log('DATABASE CONNECTED'));

//api endpoints

app.get('/',(req,res)=> {
    res.status(200).send('hello world');
});

app.get('/v1/posts',(req,res) => {
    res.status(200).send(Data);
});

app.get('/v2/posts',(req,res) => {
    Videos.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

app.post('/v2/posts',(req,res) => {
    //POST request is to ADD DATA to the database
    const dbVideos= req.body;
    Videos.create(dbVideos, (err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});


//listen
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});

 



 