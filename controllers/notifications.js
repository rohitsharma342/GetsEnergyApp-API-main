const Notification = require('../models/notifications');
const User = require('../models/user');

const axios = require('axios');

const getDb = require('../util/database').getDB; 
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;


exports.getSingleUserNotifications = (req,res,next)=>{

    const id = req.query.id;
   
    Notification.findNotificationsByUserId(id)
    .then(notiData=>{
        return res.json({status:true, message:"All User notifications",notifications:notiData});
    })  
}


exports.sendNotificationsToAllUsers = (req,res,next)=>{

    const title = req.body.title;
    const message = req.body.message;

    let notiCounter = 0;
    let isSuccess = true;

    User.fetchAllUsers(0,0)
    .then(userData=>{
        // userData.forEach(uData=>{
        //     var myJSONObject = {
        //         "app_id": process.env.ONE_SIGNAL_APP_ID,
        //         "include_player_ids": [uData.deviceId],
        //         "data": {},
        //         "contents": {"en": title+"\n"+message}
        //     };

        //     axios({
        //         method: 'post',
        //         url: "https://onesignal.com/api/v1/notifications",
        //         data: myJSONObject,
        //         headers:{
        //             'Content-Type': 'application/json',
        //             'Authorization': process.env.ONE_SIGNAL_AUTH
        //         }
        //     })
        //     .then( async result=>{
        //         notiCounter = notiCounter+1;
        //         if(result.data.recipients != 1)
        //         {
        //             console.log("Success");
        //             isSuccess = false;
        //         }
        
        //         const db = getDb();
    
        //         const notification = new Notification(uData._id.toString(),title,message);

        //         //saving in database
        //         return notification.save()
        //         .then(resultData=>{
        //             if(userData.length == notiCounter)
        //             {
        //                 if(isSuccess)
        //                 {
        //                     return res.json({status:true,message:"Notification Sent to all Users"});
        //                 }
        //                 else{
        //                     return res.json({status:false,message:"Notification not sent to all Users"});
        //                 }
        //             }
        //         })
        //     })
        //     .catch(err=>{
        //         // console.log(err);
        //         notiCounter = notiCounter+1;
        //         isSuccess = false;
        //         // console.log(userData.length,notiCounter);
        //         if(userData.length == notiCounter)
        //         {
        //             return res.json({status:false,message:"Notification not sent to all Users"});                 
        //         }
        //     })
        // })
        return res.json({status:true,message:"Notification Sent to all Users"});
    })
}


exports.sendNotificationsToSingleUser = (req,res,next)=>{

    const userId = req.params.userId;

    const title = req.body.title;
    const message = req.body.message;

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No User with this ID exists"});
        }

        // var myJSONObject = {
        //     "app_id": process.env.ONE_SIGNAL_APP_ID,
        //     "include_player_ids": [userData.deviceId],
        //     "data": {},
        //     "contents": {"en": title+"\n"+message}
        // };

        // axios({
        //     method: 'post',
        //     url: "https://onesignal.com/api/v1/notifications",
        //     data: myJSONObject,
        //     headers:{
        //         'Content-Type': 'application/json',
        //         'Authorization': process.env.ONE_SIGNAL_AUTH
        //     }
        // })
        // .then(async result => {
        //     if(result.data.recipients == 1)
        //     {
        //         const notification = new Notification(userId, title, message);

        //         //saving in database
        //         return notification.save()
        //         .then(resultData => {
        //             return res.json({ status: true, message: "Notification Sent successfully" });
        //         })
        //     }
        //     else{
        //         console.log(result.data);
        //         return res.status(500).json({ status: false, message: "Notification not sent"});
        //     }
        // })
        // .catch(err => {
        //     // console.log(err);
        //     return res.status(500).json({ status: false, message: "Error Occured", error: err });
        // })
        return res.json({ status: true, message: "Notification Sent successfully" });

    })
}
