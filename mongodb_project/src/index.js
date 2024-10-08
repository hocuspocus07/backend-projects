// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import express from "express";
import { app } from "./app.js";

dotenv.config({
    path:'../.env'
})
connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server runnning at port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("CONNECTION FAILEDDD!!! ",error);
})