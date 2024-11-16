const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

const auth = require("../util/authCheck");


router.post('/admins/login',adminController.adminLogin);

router.post('/admins/register',adminController.adminRegister);

router.post('/admin-send-token',adminController.adminSendToken);

router.post('/admin-forgot-password',adminController.adminForgotPassword);

//Get single admin details
router.get('/admins/:adminId',auth.isAdmin,adminController.getSingleAdmin);

//Edit admin details
router.patch('/admins/:adminId',adminController.editAdminDetails);

//Edit admin image
router.patch('/admins/:adminId/image',adminController.editAdminImage);


module.exports = router;
