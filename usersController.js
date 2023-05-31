const User=require("./models/userModel");

const storage =multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,path.join(_dirname,"../images"))
  },
filename:function(req,file,cb){
  cb(null,file.originalname+Data().toISOString().replace(/:/g,"-"))
  console.log(Data().toISOString())
} 
})


app.post('/ajout-user',async (req,res)=>{
    try{
        let new_user=new User({
            cin: req.body.cin,
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            motdepasse: req.body.motdepasse,
            tel: req.body.tel,
        })
        await new_user.save();
        res.send('les donnees ajouter avec succes');
    }
    catch (err){
        console.log(err);
    }
})

app.get('/users',async(req,res)=>{
  try{
    await User.find({})
    .then(result=>
      {
          res.send(result)
      })}
      catch(err){
        console.log(err)
      }
   
})

app.delete('/supprime-user/:id',async(req,res)=>{
    try{
    await User.findOneAndDelete({_id:req.params.id});
    res.send("user supprimer avec succes");
    }
    catch(err){
        console.log(err);
    }
})
app.put('/modifier-user/:id',async(req,res)=>{
    try{
        await User.findByIdAndUpdate({_id: req.params.id},
            {
                cin: req.body.cin,
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                motdepasse: req.body.motdepasse,
                tel: req.body.tel,

            })
            res.send("user modifier avec succes");
    }
    catch(err){
        console.log(err);
    }
})
module.exports = { };



const UserModel = require("../models/users.models");
const ValidateRegister = require("../validation/Register");
const ValidateLogin = require("../validation/Login");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async(exist) => {
        if (exist) {
          errors.email = "user exist";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10)//hashed password
          req.body.password = hash;
          req.body.role = "USER";
          await UserModel.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};