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

    static getAllUser = async(req,res,next)=>{
        try{
         //    let response = await userModel.find({}).populate('employeid',{firstName:1});
         //    res.json(response)
     
              res.render("home" , { name:"Abhishek", age:25})
        }
        catch (error){
           res.status(500).json(error)
        }
     }


     static createUser = async(req,res,next) => {
        try{
            console.log('req.body',req.body);
            let userDetail = req.body;
            let response = await userModel.insertMany([userDetail]);
            let parentInfo = {
               email :response._id,
               firstName : req.body.parents.firstName,
               lastName : req.body.parents.lastName,
               age : req.body.parents.age,
               phoneNo : req.body.parents.phoneNo,
            }
     
            console.log(parentInfo)
            await parentModel.insertMany([parentInfo]);
            res.json(response);
        }
        catch (error){
           res.json(error)
        }
     }



      static getUserById = async(req,res,next) => {
        let userId = req.params.userId;
        let response = await userModel.find({_id:userId});
        res.json(response)
     }


     static  deleteUser = async(req,res,next) => {
        let userId = req.params.userId;
        let response = await userModel.deleteOne({_id:userId});
        res.json(response)
     
    }


      static updateUser= async(req,res,next) => {
        let userId = req.params.userId;
        let body = req.body;
        console.log(body,userId)
        let response = await userModel.updateOne({_id:userId}, {$set:body});
        res.json(response)
    }
}

module.exports=UserController