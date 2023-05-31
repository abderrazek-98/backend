const category=require("../models/categoryModel");
const validatorCategory = require("../validation/category");
const addCategory = async (req, res) =>
{
    const { errors, isValid } = validatorCategory(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      }
      else{
        let new_category = new category({
          name: req.body.name,
          description: req.body.description,
          slug: req.body.slug,
          image: req.file.filename,})
          await new_category.save();
        
        res.status(200).json({ message: "category created successfully" });}
         
      }
    catch (error) {
      res.status(404).json(error.message);
    }
  };
  const deleteCategory=async(req,res)=>{
    try{
    await category.findOneAndDelete({_id:req.params.id});
    res.status(200).json({ message: "Category deleted successfully" });
 
    }
    catch (error) {
        res.status(404).json(error.message);
      }
}
const updateCategory=async(req,res)=>{
    const { errors, isValid } = validatorCategory(req.body);
    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        const categoryId = req.params.id;
        const updatedCategory = {
          name: req.body.name,
          description: req.body.description,
          slug: req.body.slug,
          image: req.file.filename,
        
        };
        const result = await category.findByIdAndUpdate(categoryId, updatedCategory).exec();

           
  
            res.status(200).json({ message: "Category updated sucessfully" });
          }

    } catch (error) {
      res.status(404).json(error.message);
    }
  };
const getAllCategory = async (req ,res)=>{
    try {
       const data =  await category.find()
       res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}
const getCategoryById = async (req ,res)=>{
  try {
     const data =  await category.findById({_id: req.params.id})
     //console.log(data);
     res.status(200).json(data)

  } catch (error) {
      res.status(404).json(error.message)
  }
}

const categoryByName=async (req ,res)=>{

  const name = req.params.name;
    try {
       await category.find({ name: { $regex: name, $options: 'i' } })
    .then((categories) => res.send(categories))
   } catch (error) {
       res.status(404).json(error.message)
   }
};


  module.exports = {categoryByName,addCategory,updateCategory,deleteCategory,getAllCategory,getCategoryById };