const express =require('express');
const mongoose =require ('mongoose');
const Promise =require( 'bluebird' );
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config()
const app = express();

mongoose.promise = Promise;
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true , useUnifiedTopology: true })


app.use(cors())
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'),function (err){
        if(err) res.status(500).send(err)
    });

})
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`running on ${PORT}`));
