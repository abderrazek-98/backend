const mongoose=require('mongoose');
const Schema = mongoose.Schema;
 const userSchema = new Schema(
    {
      name: {
        type: String,
      },
      firstname: {
        type: String,
      },
        email: {
          type:String,
          trim: true,
          unique: true,
        },
        password: {
          type: String,
        },
        phone: {
          type: Number,
        },
        role:{ type: String,
        enum:['SuperAdmin','Gerant','Admin']}
      },
      {
        timestamps: true,
      }
    );

 module.exports=User=mongoose.model('user',userSchema)