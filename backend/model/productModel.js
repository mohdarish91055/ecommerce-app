import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    photo:{
        data:Buffer,
        contentType: {
            type: String  // The type of the photo (like image/jpeg or image/png)
        }
    },
    shipping:{
        type:Boolean,
    }
   
},{timestamps:true})

export default mongoose.model('Products',productSchema)