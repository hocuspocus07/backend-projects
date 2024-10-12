import mongoose,{Schema} from "mongoose"

const bookSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
},{timestamps:true});

export const Books=mongoose.model("Books",bookSchema);