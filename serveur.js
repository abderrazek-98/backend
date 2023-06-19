const express=require('express');
const app=express();
const cors=require('cors');
const User=require("./models/userModel");
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
require('dotenv').config();
const db=require('./db');
console.log(__dirname)
app.use('/images', express.static(__dirname + '/public/images'));
app.use(cors());
const passport= require('passport')
const bodyParser = require('body-parser');
//utiliser pour l'ajout des donne json ajout et modification de le collection
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(process.env.PRIVATE_KEY)
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/categorys',categoryRoute);
app.use('/api/products',productRoute);
app.use(express.json());
app.use(passport.initialize())
require('./middlewares/passport')(passport)
const PORT =process.env.PORT
app.listen(PORT,function verifs(error)
{
    if(error){
        console.log('echec de connxion de serveur');
    }
    else{
        console.log('serveur started with port  '+PORT);
    }
});