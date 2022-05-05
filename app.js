const express=require("express")
const app=express()
const router=require("./routers/userRouter.js")
const databaseConection=require("./DB/database.js")


app.use(express.json())
app.use(router)
app.listen(2000,()=>{
    new databaseConection()
    console.log("server stared");
})