
const User=require("../models/userModel");
const validatorRegister = require("../validation/register");
const bcrypt = require('bcrypt');

// Fonction pour créer un super admin
/*const createSuperAdmin = async () => {
  try {
    const saltRounds = 10;
    const password = 'superadmin12345';
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const superAdmin = new User({
      email: 'superadmin1@gmail.com',
      password: hashedPassword,
      firstName: 'SuperAdmin',
      name: 'SuperAdmin',
      phone: '52933079',
      role: 'SuperAdmin'
    });

    await superAdmin.save();
    console.log('Super admin créé avec succès!');
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la création du super admin:', error);
  }
};

createSuperAdmin();*/
const Register = async (req, res) =>
{
    const { errors, isValid } = validatorRegister(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        User.findOne({ email: req.body.email }).then(async(exist) => {
          if (exist) {
            errors.email = "A user with this email already exists";
            res.status(404).json(errors);
          } else {
            const hash = bcrypt.hashSync(req.body.password, 10)//hashed password
            req.body.password = hash;
            console.log(req.body)
            await User.create(req.body);
  
            res.status(200).json({ message: "User created successfully" });
          }
        });
      }
    } catch (error) {
      res.status(404).json(error.message);
    }
  };
const getAllUsers=async(req,res)=>{
  try{
    const data =  await User.find()
    res.status(200).json(data)
  }
      catch (err) {
        res.status(404).json(err.message);
      }
   
}

const deleteUser=async(req,res)=>{
    try{
    await User.findOneAndDelete({_id:req.params.id});
    res.status(200).json({ message: "User deleted successfully" });
 
    }
    catch (error) {
        res.status(404).json(error.message);
      }
}
const updateUser=async(req,res)=>{
    const { errors, isValid } = validatorRegister(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
            const hash = bcrypt.hashSync(req.body.password, 10)//hashed password
            req.body.password = hash;
           // req.body.role = "USER";
            await User.findByIdAndUpdate({_id: req.params.id},req.body);
  
            res.status(200).json({ message: "User updated sucessfully" });
          }

    } catch (error) {
      res.status(404).json(error.message);
    }
  };
  const getUserById = async (req ,res)=>{
    try {
      const data =  await User.findById({_id: req.params.id},req.body)
      res.status(200).json(data)
 
   } catch (error) {
       res.status(404).json(error.message)
   }
  }
module.exports = {updateUser,deleteUser,getAllUsers,getUserById,Register };