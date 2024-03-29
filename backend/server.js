import express from "express"
const app=express()

app.get("/",(req,res)=>{
    console.log("server.js get /")
    res.send("server started")
})

app.listen("5000",()=>{
    
    console.log("server started")
})