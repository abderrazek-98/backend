const mongoose=require('mongoose');
const Category=require("../models/categoryModel")
var suplementSchema= new mongoose.Schema({
    supplement:{type:String},
    prix:{type:Number},
})
var detailsSchema= new mongoose.Schema({
    time:{type:String},
    calory:{type:Number},
    cooking:{type:Number}
})
const productSchema = new mongoose.Schema({

    name: {
        type: String
       
    },
    description: {
        type: String,
        trim: true,
        maxlength: 2000,
    },
 
    price: {
        type: String,
        trim: true,
        maxlength: 32
 
    },
 
    image: {

            type: String,
            required: true
 
    },
 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    supplements: [suplementSchema],
    details: [detailsSchema],
    favorite: { type: Boolean, default: false },
 }, {timestamps: true});
 
 module.exports = mongoose.model("Product", productSchema);