const express = require(
    "express"
)
const cors = require("cors")
const mongoose = require("mongoose")
const app = express();

const {User} = require("./User")

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://1234:1234@notes-app.fyzxjo4.mongodb.net/?retryWrites=true&w=majority&appName=Notes-app')
.then(()=>{
    console.log("connected...")
}).catch((err)=>{
    console.log("connection failed...")
    console.log(err)
})


app.get("/",async (req,res)=>{

    const user = await User.find()
    res.json({message:"All users",data:{users:user}})
})


app.post("/create-post",async (req,res)=>{
    const {email,password}=req.body;
    const user = await User.create({email,password})
    res.json({message:"User created",data:{user}})
})


app.listen(5500,()=>{
    console.log("Server running at ",5500)
})
