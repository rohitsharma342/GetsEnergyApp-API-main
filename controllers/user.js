const User = require('../models/user');

var crypto = require('crypto'); 
const jwt = require('jsonwebtoken');

const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 
const ObjectId = mongodb.ObjectId;

//For Email 
var nodemailer = require('nodemailer');

//FOR ZOHO integration
let transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  secure: true,
  port: 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});


exports.signUpUser = (req,res,next)=>{

    const fullName = req.body.fullName;
    const email = req.body.email;  
    const password = req.body.password;
    const deviceId = req.body.deviceId;

    //Encrypting Password
    var hash = crypto.createHash('sha256');
    hash.update(password);
    var hex = hash.digest('hex');

    User.findUserByEmail(email)
    .then(userData=>{
        if(userData)
        {
            return res.status(409).json({status:false, message:"User with this Email already exists"});
        }

        const user = new User(fullName,email,hex,deviceId,"");

        //saving in database
        return user.save()
        .then(resultData=>{
            jwt.sign({ user: resultData["ops"][0] }, 'myAppSecretKey', (err, token) => {
                let userDataNew = resultData["ops"][0];
                userDataNew.deviceToken = token;
                const db = getDb();
                db.collection('users').updateOne({email:email},{$set:userDataNew})
                .then(resultData1=>{
                    return res.json({status:true,message:"User Registered Successfully",user:resultData["ops"][0],token: token});
                });
            });
        })
        .catch(err=>console.log(err));
    })

}


exports.userLogin=(req,res,next)=>{

    const email = req.body.email;
    const password = req.body.password;
    const deviceId = req.body.deviceId;

    User.findUserByEmail(email)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:'No user with this email exists'});
        }

        //Password
        var hash = crypto.createHash('sha256');
        hash.update(password);
        var hex = hash.digest('hex');

        if(userData.password != hex)
        {
            return res.status(401).json({status:false, message:'Incorrect Password'});
        }

        userData.deviceId = deviceId;
        userData.deviceToken = "";

        const db = getDb();
        db.collection('users').updateOne({email:email},{$set:userData})
        .then(resultData=>{
            jwt.sign({ user: userData }, 'myAppSecretKey', (err, token) => {
                userData.deviceToken = token;
                db.collection('users').updateOne({email:email},{$set:userData})
                .then(resultData1=>{
                    res.json({
                        status: true,
                        message: "Successfully Logged In",
                        user: userData,
                        token: token
                    });
                });
            });
        })
        .catch(err=>console.log(err));
    })

}


exports.sendSignupOtp = (req,res,next)=>{

    try{
        const email = req.body.email;

        User.findUserByEmail(email)
        .then(userData=>{
            if(userData)
            {
                return res.status(409).json({status:false, message:'User with this Email already exists'});
            }
            var token = "";

            var length = 4,
            charset = "123456789",        
            retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            token = retVal;
        
            // const mailOptions = {
            //     from: process.env.NODEMAILER_USER, // sender address
            //     to: userData.email,
            //     subject: 'getsenergy | Password Reset OTP',
            //     html: "You requested a password reset. Your Token : "+token // plain text body
            // };

            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //     console.log(error);
            //     return res.json({status:false, message:"Error Occured", error:error});
            //     } else {
            //     console.log('Email sent: ' + info.response);
            //     return res.json({status:true, message:'OTP sent successfully',otp:token});
            //     }
            // });
            return res.json({status:true, message:'OTP sent successfully',otp:"1234"});
        })
    }
    catch(exception)
    {
        next(exception);
    }
}


exports.getSingleUserDetails=(req,res,next)=>{

    try{
        const userId = req.params.userId;

        User.findUserByUserId(userId)
        .then(userData=>{
            if(!userData)
            {
                return res.status(404).json({status:false, message:'No user with this ID exists'});
            }
            return res.json({status:true, message:"User Exists", user:userData});
        })
    }
    catch(exception)
    {
        next(exception);
    }
}


exports.getAllUsersByName = (req,res,next)=>{

    const userName = req.body.userName.trim();

    User.fetchAllUsersByName(userName)
    .then(usersData=>{
        // console.log(usersData);
        if(usersData.length==0)
        {
            return res.json({status:false, message:"No user with this name exists",users:[]});
        }
        return res.json({status:true, message:"User(s) exists",users:usersData});
    })

}


function checkEmailAvailability(userId, email,_callBack)
{
    User.findUserByUserId(userId)
    .then(userDoc=>{
        if(!userDoc)
        {
            _callBack(false,"No user with this ID exists");
            return;
        }
        User.findUserByEmail(email)
        .then(userNew=>{
            if(!userNew)
            {
                _callBack(true,"New Email");
                return;
            }
            else if(userNew.email == userDoc.email)
            {
                _callBack(true,"Same Email");
                return;
            }
            else if(userNew.email != userDoc.email)
            {
                _callBack(false,"Email already used by another user");
                return;
            }
        })                
    })

}

exports.editUserDetails = (req,res,next)=>{

    const userId = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;
    const userType = +req.body.userType;
    //Will read companyName and address only when userType = 1

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No user with this ID exists"});
        }
                                //Using callback asynchronous approach
        checkEmailAvailability(userId, email, (valStatus,valMsg) => {
            if(!valStatus)
            {
                return res.json({status:false, message:valMsg});
            }
            console.log(valStatus,valMsg);

            userData.name = name;
            userData.email = email;
            userData.address = req.body.address;
            if(userType==1)
            {
                userData.companyName = req.body.companyName;
            }

            const db = getDb();
            
            var o_id = new ObjectId(userId);
            db.collection('users').updateOne({_id:o_id},{$set:userData})
            .then(resultData=>{
                jwt.sign({ user: userData }, 'myAppSecretKey', (err, token) => {
                    res.json({status:true, message:'User Details Changed Successfully',user:userData,token:token});  
                });  
            })
            .catch(err=>console.log(err)); 
        });
    })
   
}


exports.getAllUsers = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    User.fetchAllUsers(skip,limit)
    .then(usersData=>{
        return res.json({status:true, message:"All users returned",users:usersData});
    })
}


exports.deleteSingleUser = (req,res,next)=>{

    const userId = req.params.userId;

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.json({status:false, message:"No user with this ID exists"});
        }
        const db = getDb();
        var o_id = new ObjectId(userId);

        db.collection('users').deleteOne({_id:o_id})
            .then(resultData=>{
                
                res.json({status:true, message:'User Deleted Successfully'});
            })
            .catch(err=>console.log(err));        
    })    
}


exports.forgotUserPassword = (req,res,next)=>{

    const email = req.body.email;
    const newPassword = req.body.newPassword;

    var hash = crypto.createHash('sha256');
    hash.update(newPassword);
    var hex = hash.digest('hex');

    User.findUserByEmail(email)
    .then(userDoc=>{
        if(!userDoc)
        {
            return res.status(404).json({status:false,message:'User does not exist'});
        }
                    
        userDoc.password = hex;
    
        const db = getDb();
        db.collection('users').updateOne({email:email},{$set:userDoc})
        .then(resultData=>{
            
            res.json({status:true, message:'Password Changed Successfully',user:userDoc});    
        })
        .catch(err=>console.log(err));
    })   

}

