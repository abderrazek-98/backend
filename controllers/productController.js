const product = require("../models/productModel");
const Category = require("../models/categoryModel");
const CartModel = require("../models/cartModel");
const validatorProduct = require("../validation/product");
const path = require("path");
const { log } = require("console");



const getAllProduct = async (req, res) => {
  try {
    const data = await product
      .find()
      .populate({ path: "category", model: "category" });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getAllCartConfirmer = async (req, res) => {
  try {
    const data = await CartModel.find({ confirmed: false });
    //const data = await CartModel.find();
    res.status(200).json(data);
    console.log(data)
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getAllCart = async (req, res) => {
  try {
    const data = await CartModel.find();
    //const data = await CartModel.find();
    res.status(200).json(data);
    console.log(data)
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const addProduct = async (req, res) => {
let supplements=[]
let details=[]
  
   try {
    
   let parsedSupplements = JSON.parse(req.body.supplements);
  /*  let supplements =  JSON.parse(req.body.supplements).map((supp,index) => {
      return {
        supplement: supp.supplement,
        prix: supp.prix,
        imageSupp: req.files[`imageSupp-${index}`][0].filename,
      };
    });*/
  
    let new_product = new product({
        name: req.body.name,
        description: req.body.description,
       
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category,
        supplements: JSON.parse(req.body.supplements),
        details: JSON.parse(req.body.details)
           /* supplements: JSON.parse(req.body.supplements),*/
       // supplements: [{ name: req.body.supplementName, price: req.body.supplementPrice }]

      });
      console.log(new_product)
      await new_product.save();

      res.status(200).json({ message: "product created successfully" });
     
  } catch (error) {
    res.status(404).json(error.message);
  }
console.log(new_product.image)
};
const deleteProduct = async (req, res) => {
  try {
    await product.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const deleteCart = async (req, res) => {
  try {
    await CartModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const hiddenCart = async (req, res) => {
  try {
    const order = await CartModel.findOne({ _id: req.params.id });
    order.confirmed = true; // Mettez à jour la propriété "hidden" de la commande à true
    await order.save();
    res.status(200).json({ message: "cart hidden  successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const updateProduct = async (req, res) => {
  //const { errors, isValid } = validatorProduct(req.body);
  
  try {  
      const productId = req.params.id;
      const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
       
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category,
        supplements: JSON.parse(req.body.supplements),
        details: JSON.parse(req.body.details)
      };
      const result = await product.findByIdAndUpdate(productId, updatedProduct).populate({ path: "category", model: "category" })
      .exec();
      res.status(200).json({ message: "Product updated sucessfully" });
  } catch (error) {
    console.log(error)
    res.status(404).json(error.message);
  }
};
const getProductById = async (req, res) => {
  try {
    const data = await product.findById({ _id: req.params.id }).populate({ path: "category", model: "category" })
    .exec();;
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const getCartById = async (req, res) => {
  try {
    const data = await CartModel.findById({ _id: req.params.id }).populate('items.product')
    .exec();
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
  console.log(data.image);
};
const productByName=async (req ,res)=>{

  const name = req.params.name;
    try {
      if (name==="") {
        // Si le champ de recherche est vide, renvoyer tous les produits
        Product.find()
          .then((products) => res.send(products))
          .catch((error) => {
            console.error(error);
            res.status(500).send('pas de produit de e nom ');
          })}else
       await product.find({ name: { $regex: name, $options: 'i' } })
    .then((products) => res.send(products))
   } catch (error) {
       res.status(404).json(error.message)
   }
};
const getProductCategory =async(req, res) => {
  const categoryId = req.params.categoryId;
  product.find({ category: categoryId }, (err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.send(products);
  });
}
const getCarts = async (req, res) => {
  try {
    const cart = new CartModel(req.body);
    console.log(cart);
    await cart.save();
    res.send('Cart saved');
  } catch (error) {
    res.status(500).send(error.message);
  }}
module.exports = {
  getProductCategory,
  productByName,
  getAllProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getCarts,
  getAllCart,
  getCartById,
  hiddenCart,
  getAllCartConfirmer,
  deleteCart,
};
