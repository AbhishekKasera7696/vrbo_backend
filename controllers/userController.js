const userSchema=require("../model/userSchema.js")
class UserController{

    static login=async(req,res,next)=>{
            try {
                const {email,password}=req.body
                const  response=await userSchema.find({email:email})
                res.send({"message":"login sucessfully",response:response})

            } catch (error) {
                res.status(500).send({"message":"login issue",response:response})
            }
    }
    static register=async(req,res,next)=>{
        try {
            

            const response=await userSchema.insertMany([req.body])
            res.send({"message":"registration completed"})
    
        } catch (error) {
            res.status(500).send({"message":"registration issue",response:response})
        }
    }
}

module.exports=UserController