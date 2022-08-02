const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path=require('path');

const connectDB = require('./server/database/connection');
const app=express();

dotenv.config({path:'config.env'})
const PORT=process.env.PORT ||8080

// mongodb connection
connectDB();

//log requests
app.use(morgan('tiny'));




//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
// app.use(express.static('views'));
// app.set("views",path.resolve(__dirname,"views/html"))---> used when their is another folder of html inside the view folder 

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// app.get('/',(req,res)=>{
//     res.render('index');
// })

app.use('/', require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log('Server is running on',PORT);
});