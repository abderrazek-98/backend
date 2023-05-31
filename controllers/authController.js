
const User=require("../models/userModel");
const validatorLogin = require("../validation/login");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const login= async(req,res)=>{
    const {errors,isValid}=validatorLogin(req.body)
try{
   if(!isValid){
    res.status(404).json(errors)
   }else{
    User.findOne({ email: req.body.email })
          .then(user=>{
            if(!user){
                errors.email="not found user"
                res.status(404).json(errors)
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                .then(isMatch=>{
                    if (!isMatch){
                        errors.password = "incorrect password"
                        res.status(404).json(errors)
                     }
                     else{
                     token = jwt.sign({ 
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                           }, process.env.PRIVATE_KEY,  { expiresIn: '1h' });
                           res.status(200).json({
                             message: "success",
                             token: token
                           })
                    }
                }
                )}
                     
     
            
        })
   }
        
    }
catch(error){
    res.status(404).json(error.message);
}   
}
const test=(req,res)=>{

    res.send("bienvenu test")
  }
  const admin=(req,res)=>{

    res.send("bienvenu admin")
  }
module.exports = {login,test,admin };