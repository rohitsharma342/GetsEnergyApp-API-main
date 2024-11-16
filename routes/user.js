const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const serverName = "https://getsenergyapp-api-main.onrender.com/api/download/";

const auth = require("../util/authCheck");

const path = require('path');

const multer = require('multer');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./newFileUploads');
    },
    filename:function(req,file,cb){
        var dt = new Date().getTime();
        var newOrignalName = dt+file.originalname.replace(/ /g, "");
        cb(null,newOrignalName)
    }
})

var upload1 = multer({storage:store}).single('newImage');

router.get('/download/:filename', function(req,res,next){
    
    filepath = path.join(__dirname,'../newFileUploads') +'/'+ req.params.filename;
    
    res.download(filepath, req.params.filename);    
});

router.post('/users/signup',userController.signUpUser);

router.post('/users/login',userController.userLogin);

//Send OTP on emailID
router.post('/users/signup/send-otp',userController.sendSignupOtp);

router.get('/users/:userId',auth.isBoth,userController.getSingleUserDetails);

//Find users by name (or starts by/contains that name)
router.post('/users/name-filter',auth.isBoth,userController.getAllUsersByName);

//Edit user details
router.post('/users/:userId/edit',auth.isUser,userController.editUserDetails);

// api/users                     -> Get All users in one go
// api/users?skip=10&limit=10    -> Get users based on skip and limit
router.get('/users',auth.isAdmin,userController.getAllUsers);

router.delete('/users/:userId',userController.deleteSingleUser);

router.post('/users/forgot-password',userController.forgotUserPassword);

//Upload media file
router.post('/upload-single-image',(req,res,next)=>{

    upload1(req,res,function(err){
        if(req.file!=null)
        {
            req.file.originalname = req.file.originalname.replace(/ /g, "");
            req.file.filename = req.file.filename.replace(/ /g, "");
        }
        else{
            console.log("No Image")
            req.file = {
                originalname:null,
                filename:null
            };
        }
           
        if(err)
        {
            return res.status(500).json({status:false,message:"Error Occured",error:err})
        }        
      
        let newImage = serverName+req.file.filename;
        return res.json({status:true,message:"Image Uploaded Successfully",imageUrl:newImage});
    })
});


module.exports = router;
