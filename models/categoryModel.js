const mongoose=require('mongoose');
const categorySchema = new mongoose.Schema(
  { 
    name: {
      type: String,
    },
    description: {
      type: String,
   },
    slug: {
      type: String,
    },
    image: {

      type: String,
      required: true

},
  },
  
  {
    timestamps: true,
  }
);

 module.exports=Category=mongoose.model('category',categorySchema)