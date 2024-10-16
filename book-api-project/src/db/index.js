import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv"
dotenv.config({
    path:"../.env"
})
const connectDb=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`mongo db connected! DB HOST: ${connectionInstance.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
export default connectDb;