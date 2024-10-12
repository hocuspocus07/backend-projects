import dotenv from "dotenv"
import { app } from "./app.js";
import connectDb from "./db/index.js";

dotenv.config({
    path:"../.env"
})
connectDb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server running at port: ${process.env.PORT}`);
    })}
).catch((error)=>{
    console.log("connection falied ",error);
})