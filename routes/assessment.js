const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessment');
const Assessment = require('../models/assessment');

const serverName = "http://198.199.75.36/api/download/";

const auth = require("../util/authCheck");

const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 

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

var upload1 = multer({storage:store}).single('sketchFile');

router.get('/download/:filename', function(req,res,next){
    
    filepath = path.join(__dirname,'../newFileUploads') +'/'+ req.params.filename;
    
    res.download(filepath, req.params.filename);    
});

//Assessment will be created with this API (and customer details will be filled for now)
router.post('/assessments/pre/customer-details',auth.isUser,assessmentController.addCustomerDetails);

//Assessment will be converted to POST here (and customer details will be updated)
router.post('/assessments/post/customer-details',auth.isUser,assessmentController.addCustomerDetailsPostAssessment);

// router.post('/assessments/house-sketch',auth.isUser,assessmentController.addEditHouseSketches);

router.post('/assessments/house-details',auth.isUser,assessmentController.addEditHouseDetails);

router.post('/assessments/air-tightness',auth.isUser,assessmentController.addEditAirTightnessDetails);

router.post('/assessments/recommendations',auth.isUser,assessmentController.addEditRecommendations);

//Create complete assessment in one API
router.post('/assessments/create',auth.isUser,assessmentController.createNewAssessment);

// api/assessments/pre                     -> Get All apre-ssessments
// api/assessments/pre?skip=10&limit=10    -> Get pre-assessments based on skip and limit
router.get('/assessments/pre',auth.isAdmin,assessmentController.getAllPreAssessments);

// api/assessments/user/pre?userId=1234                     -> Get All assessments of particular user in one go
// api/assessments/user/pre?userId=1234&skip=10&limit=10    -> Get assessments of particular user based on skip and limit
router.get('/assessments/user/pre',auth.isBoth,assessmentController.getAllPreAssessmentsForParticularUser);

// api/assessments/user/post?userId=1234                     -> Get All post assessments of particular user in one go
// api/assessments/user/post?userId=1234&skip=10&limit=10    -> Get post assessments of particular user based on skip and limit
router.get('/assessments/user/post',auth.isBoth,assessmentController.getAllPostAssessmentsForParticularUser);

// All assessments of particular user
router.get('/assessments/user/:userId',auth.isBoth,assessmentController.getAllUserAssessments);

//Get assessment details by assessmentNumber
router.get('/assessments/:assessmentNumber',auth.isBoth,assessmentController.getParticularAssessmentDetails);

router.patch('/assessments/:assessmentNumber/xml',auth.isAdmin,assessmentController.editAssessmentXmlFile);

// api/assessments?assessmentNumber=1234
router.delete('/assessments',auth.isBoth,assessmentController.deleteParticularAssessment);

router.post('/assessments/filter',auth.isBoth,assessmentController.getAllAssessmentsByNumber);

router.post('/assessments/generate-pdf',assessmentController.generatePdf);

router.post('/assessments/generate-xml',assessmentController.getAssessmentXML);

router.post('/assessments/house-sketch',auth.isUser,(req,res,next)=>{

    // upload1(req,res,function(err){
    //     if(req.file!=null)
    //     {
    //         req.file.originalname = req.file.originalname.replace(/ /g, "");
    //         req.file.filename = req.file.filename.replace(/ /g, "");
    //     }
    //     else{
    //         console.log("No Image")
    //         req.file = {
    //             originalname:null,
    //             filename:null
    //         };
    //     }
           
    //     if(err)
    //     {
    //         return res.status(500).json({status:false,message:"Error Occured",error:err})
    //     }
        
        const assessmentNumber = req.body.assessmentNumber;
        const name = req.body.name;      
        // let sketchUrl = serverName+req.file.filename;
        let sketchUrl = req.body.sketchFile;

        Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
        .then(assessmentData=>{
            if(!assessmentData)
            {
                return res.status(404).json({status:false, message:"No assessment with this number exists"});
            }
    
            assessmentData.houseSketches = {name:name,sketchUrl:sketchUrl};
            
            const db = getDb();
    
            db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
            .then(resultData=>{
                res.json({status:true, message:'House sketch updated successfully',assessment:assessmentData});
            })
            .catch(err=>console.log(err));
        })
    // })
});


module.exports = router;
