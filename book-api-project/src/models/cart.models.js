import mongoose,{mongo, Schema} from "mongoose"

const cartSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    books:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Books",
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
        required:true,
    }
},{timestamps:true})
export const Cart=mongoose.model("Cart",cartSchema);