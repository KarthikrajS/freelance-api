import express from 'express';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import dotenv from 'dotenv';
import cors  from 'cors';
import path from 'path';

import user from './routes/user.js';

dotenv.config();

const __dirname= path.resolve();
const app = express();

mongoose.promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true , useUnifiedTopology: true })
app.use(cors())

//app.use('/user',user);
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'),function (err){
        if(err) res.status(500).send(err)
    });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`running on ${PORT}`));
