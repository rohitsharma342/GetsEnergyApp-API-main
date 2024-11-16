const express = require('express');
const router = express.Router();
const notiController = require('../controllers/notifications');

const auth = require("../util/authCheck");


//Get notifications of particular user
// api/notifications/users?id=1234
router.get('/notifications/users',auth.isUser,notiController.getSingleUserNotifications);

//Send notifications to all users
router.post('/notifications/users',auth.isAdmin,notiController.sendNotificationsToAllUsers);

//Send notification to particular user
router.post('/notifications/users/:userId',auth.isAdmin,notiController.sendNotificationsToSingleUser);


module.exports = router;
