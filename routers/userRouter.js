const router=require("express").Router()
const UserController=require("../controllers/userController.js")
const passport = require('../Authentication/googleLogin');
const userModel = require('../model/userSchema');
const JWTService = require('../CommonLib/JWTtoken');
const encryptDecrypt = require('../CommonLib/encryption-decryption');
const facebookAuth = require("../Authentication/faceauth");

router.use('/auth', facebookAuth)

router.get("/userdata")
router.post('/user', UserController.createUser);
router.get('/user',UserController.getAllUser);
router.get('/user/:userId',UserController.getUserById);
router.put('/user/:userId', UserController.updateUser);
router.delete('/user/:userId', UserController.deleteUser);


router.get("/failed", (req, res) => {
    res.send("some error occured")
});


router.get("/success", (req, res) => {
    console.log(req.user);
    res.send("login succesfully")
});

router.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
}),


async function (req, res) {
    // console.log(req.user)

    //check if user exist in our system
    //if user exist, genearate token send back to frontend.
    //else register user ,generate token and then send to frontend.
   
    let email = req.user.email;
    //check for email
    const userDetail = await userModel.findOne({ email });
    if(userDetail){
        //create token and send to frontend
        console.log("hi there",userDetail);
      
        let obj = {
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            age: userDetail.age,
            phoneNo: userDetail.phoneNo,
            email: userDetail.email,
            gender: userDetail.gender

        }



        let JWTtoken = JWTService.generateToken(obj);
        res.status(200).json(
            {
              message: "succesfull login",
              token:JWTtoken

            })

        }else{
            let lastUser = await userModel.find({}).sort({ id : -1}).limit(1);
            let encrptedPassword = encryptDecrypt.encryptPassword("kajjajbhjvqnjq@123$$$$");
             let userDetailObj ={
                firstName : req.user._json.given_name,
                lastName : req.user._json.family_name,
                age:-1,
                phoneNo:-1,
                email:req.user._json.email,
                gender:"NA",
                password:encrptedPassword,
                id:lastUser[0].id + 1
             }

             let response = await userModel.insertMany([userDetailObj]);
             delete userDetailObj.password;
             let JWTtoken = JWTService.generateToken(userDetailObj);
             res.status(200).json(
               {
                 message: "Registartion Succesfull",
                 token:JWTtoken

               })
       }
        // res.redirect('/success')

    }
    );







//This endpoint connects the User to Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));

//This endpoint is the Facebook Callback URL and on success or failure returns a response to the app
router.get('/callback', passport.authenticate('facebook', {          
            failureRedirect: '/login' }), (req, res) => {
                    //  res.redirect('/user/home');
                    res.send("successfully login")
});


router.post("/login",UserController.login)
router.post("/register",UserController.register)


module.exports=router