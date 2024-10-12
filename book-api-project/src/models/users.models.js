import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    username:{
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,"please enter a password"]
    },
    email:{
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema);