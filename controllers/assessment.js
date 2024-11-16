const Assessment = require('../models/assessment');
const User = require('../models/user');

const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 
const ObjectId = mongodb.ObjectId;

const jwt = require("jsonwebtoken");

// Importing modules
const PDFDocument = require('pdfkit');
const fs = require('fs');

var js2xmlparser = require("js2xmlparser");

const serverName = "http://198.199.75.36/api/download/";


exports.addCustomerDetails = (req,res,next)=>{

    const userId = req.body.userId;
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const customerPhone = req.body.customerPhone;
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const yearBuilt = req.body.yearBuilt;
    const assessmentNumber = req.body.assessmentNumber;
    const apNumber = req.body.apNumber;
    const vermInsulation = +req.body.vermInsulation;
    const programmableThermostat = +req.body.programmableThermostat;
    const stoveType = +req.body.stoveType;
    const dryerType = +req.body.dryerType;
    const indoorTemp = req.body.indoorTemp;
    const indoorCF = req.body.indoorCF;
    const outdoorTemp = req.body.outdoorTemp;
    const outdoorCF = req.body.outdoorCF;
    const atypicalLoads = req.body.atypicalLoads;
    const lowFlowToiletCounts = +req.body.lowFlowToiletCounts;
    const totalToilets = +req.body.totalToilets;
    const exhaustFansCount = +req.body.exhaustFansCount;
    const rangeHoodsCount = +req.body.rangeHoodsCount;
    const houseFrontFacing = req.body.houseFrontFacing;
    const note = req.body.note;
    const assessmentType = +req.body.assessmentType;
    const houseSketches = {};
    const ceilingDetails = [];
    const heatingSystemDetails = [];
    const heatingSystemDetails2 = [];
    const hotWaterSystemDetails = {};
    const ventilationSystemDetails = {};
    const floorDetails = [];
    const tightnessTestDetails = {};
    const leakageTestDetails = {};
    const upgrades = [];
    const recommendations = [];
    const otherNote = "";
    const brouchers = [];
    const homeOwnerNotice = {};
    const advisorCheckList = {};
    const xmlLink = "";
    const isSubmitted = 0;

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No user with this ID exists"});
        }
        // console.log(userData.deviceToken, "\nTOken : ",req.headers.authorization.split(" ")[1]);
        if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
        {
            return res.status(401).json({status:false, message:"You have already logged-in with another device"});
        }
        else{
            Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
            .then(assessmentData=>{
                if(assessmentData)    //Update assessment details
                {
                    // return res.status(409).json({status:false, message:"Assessment with this number already exists"});
                    assessmentData.customerName = customerName;
                    assessmentData.customerEmail = customerEmail;
                    assessmentData.customerPhone = customerPhone;
                    assessmentData.address = address;
                    assessmentData.city = city;
                    assessmentData.province = province;
                    assessmentData.postalCode = postalCode;
                    assessmentData.yearBuilt = yearBuilt;
                    assessmentData.vermInsulation = vermInsulation;
                    assessmentData.programmableThermostat = programmableThermostat;
                    assessmentData.stoveType = stoveType;
                    assessmentData.dryerType = dryerType;
                    assessmentData.indoorTemp = indoorTemp;
                    assessmentData.indoorCF = indoorCF;
                    assessmentData.outdoorTemp = outdoorTemp;
                    assessmentData.outdoorCF = outdoorCF;
                    assessmentData.atypicalLoads = atypicalLoads;
                    assessmentData.lowFlowToiletCounts = lowFlowToiletCounts;
                    assessmentData.totalToilets = totalToilets;
                    assessmentData.exhaustFansCount = exhaustFansCount;
                    assessmentData.rangeHoodsCount = rangeHoodsCount;
                    assessmentData.houseFrontFacing = houseFrontFacing;
                    assessmentData.note = note;
                    
                    const db = getDb();
    
                    db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
                    .then(resultData=>{
                        res.json({status:true, message:'Assessment updated successfully',assessment:assessmentData});
                    })
                    .catch(err=>console.log(err));
                }
                else{  //Create new assessment
                    Assessment.findAssessmentByApNumber(apNumber)
                    .then(assessmentDataAp=>{
                        // if(assessmentDataAp)
                        // {
                        //     return res.status(409).json({status:false, message:"Assessment with this AP number already exists"});
                        // }
            
                        const assessmentObj = new Assessment(userId,customerName,customerEmail,customerPhone,address,city,province,postalCode,yearBuilt,assessmentNumber,
                                                apNumber,vermInsulation,programmableThermostat,stoveType,dryerType,indoorTemp,indoorCF,outdoorTemp,outdoorCF,atypicalLoads,
                                                lowFlowToiletCounts,totalToilets,exhaustFansCount,rangeHoodsCount,houseFrontFacing,note,assessmentType,
                                                houseSketches,ceilingDetails,heatingSystemDetails,heatingSystemDetails2,hotWaterSystemDetails,ventilationSystemDetails,floorDetails,
                                                tightnessTestDetails,leakageTestDetails,upgrades,recommendations,otherNote,brouchers,homeOwnerNotice,
                                                advisorCheckList,xmlLink,0);
            
                        //saving in database
                        return assessmentObj.save()
                        .then(resultData=>{
                        return res.json({status:true,message:"Pre-Assessment created successfully",assessment:resultData["ops"][0]});
                        })
                        .catch(err=>console.log(err));
                    })
                }
            })
        }
    })

}


exports.addCustomerDetailsPostAssessment = (req,res,next)=>{

    const userId = req.body.userId;
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const customerPhone = req.body.customerPhone;
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const yearBuilt = req.body.yearBuilt;
    const assessmentNumber = req.body.assessmentNumber;
    const apNumber = req.body.apNumber;
    const vermInsulation = +req.body.vermInsulation;
    const programmableThermostat = +req.body.programmableThermostat;
    const stoveType = +req.body.stoveType;
    const dryerType = +req.body.dryerType;
    const indoorTemp = req.body.indoorTemp;
    const outdoorTemp = req.body.outdoorTemp;
    const atypicalLoads = req.body.atypicalLoads;
    const lowFlowToiletCounts = +req.body.lowFlowToiletCounts;
    const totalToilets = +req.body.totalToilets;
    const exhaustFansCount = +req.body.exhaustFansCount;
    const rangeHoodsCount = +req.body.rangeHoodsCount;
    const houseFrontFacing = req.body.houseFrontFacing;
    const note = req.body.note;
    const assessmentType = +req.body.assessmentType;

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No user with this ID exists"});
        }
        Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
        .then(assessmentData=>{
            if(!assessmentData)
            {
                return res.status(404).json({status:false, message:"No Assessment with this number exists"});
            }
            Assessment.findAssessmentByApNumber(apNumber)
            .then(assessmentDataAp=>{
                if(!assessmentDataAp)
                {
                    return res.status(404).json({status:false, message:"No Assessment with this AP number exists"});
                }
                //update data
                assessmentData.customerName = customerName;
                assessmentData.customerEmail = customerEmail;
                assessmentData.customerPhone = customerPhone;
                assessmentData.address = address;
                assessmentData.city = city;
                assessmentData.province = province;
                assessmentData.postalCode = postalCode;
                assessmentData.yearBuilt = yearBuilt;
                assessmentData.vermInsulation = vermInsulation;
                assessmentData.programmableThermostat = programmableThermostat;
                assessmentData.stoveType = stoveType;
                assessmentData.dryerType = dryerType;
                assessmentData.indoorTemp = indoorTemp;
                assessmentData.outdoorTemp = outdoorTemp;
                assessmentData.atypicalLoads = atypicalLoads;
                assessmentData.lowFlowToiletCounts = lowFlowToiletCounts;
                assessmentData.totalToilets = totalToilets;
                assessmentData.exhaustFansCount = exhaustFansCount;
                assessmentData.rangeHoodsCount = rangeHoodsCount;
                assessmentData.houseFrontFacing = houseFrontFacing;
                assessmentData.note = note;
                assessmentData.assessmentType = assessmentType;

                const db = getDb();

                db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
                .then(resultData=>{
                    res.json({status:true, message:'Assessment updated successfully',assessment:assessmentData});
                })
                .catch(err=>console.log(err));
            })
        })
    })

}


exports.addEditHouseSketches = (req,res,next)=>{

    const assessmentNumber = req.body.assessmentNumber;
    const houseSketches = req.body.houseSketches;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }

        assessmentData.houseSketches = houseSketches;
        
        const db = getDb();

        db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
        .then(resultData=>{
            res.json({status:true, message:'House sketches updated successfully',assessment:assessmentData});
        })
        .catch(err=>console.log(err));
    })

}


exports.addEditHouseDetails = (req,res,next)=>{

    const assessmentNumber = req.body.assessmentNumber;

    const ceilingDetails = req.body.ceilingDetails;
    const heatingSystemDetails = req.body.heatingSystemDetails;
    const heatingSystemDetails2 = req.body.heatingSystemDetails2;
    const hotWaterSystemDetails = req.body.hotWaterSystemDetails;
    const ventilationSystemDetails = req.body.ventilationSystemDetails;
    const floorDetails = req.body.floorDetails;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        User.findUserByUserId(assessmentData.userId)
        .then(userData=>{
            if(!userData)
            {
                return res.status(404).json({status:false, message:"No User with this ID exists"});
            }
            // console.log(userData.deviceToken, "\nToken : ",req.headers.authorization.split(" ")[1]);
            if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
            {
                return res.status(401).json({status:false, message:"You have already logged-in with another device"});
            }
            else{
                assessmentData.ceilingDetails = ceilingDetails;
                assessmentData.heatingSystemDetails = heatingSystemDetails;
                assessmentData.heatingSystemDetails2 = heatingSystemDetails2;
                assessmentData.hotWaterSystemDetails = hotWaterSystemDetails;
                assessmentData.ventilationSystemDetails = ventilationSystemDetails;
                assessmentData.floorDetails = floorDetails;
                
                const db = getDb();
        
                db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
                .then(resultData=>{
                    res.json({status:true, message:'House details updated successfully',assessment:assessmentData});
                })
                .catch(err=>console.log(err));
            }
        })
    })

}


exports.addEditAirTightnessDetails = (req,res,next)=>{
    
    const assessmentNumber = req.body.assessmentNumber;
    const tightnessTestDetails = req.body.tightnessTestDetails;
    const leakageTestDetails = req.body.leakageTestDetails;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        User.findUserByUserId(assessmentData.userId)
        .then(userData=>{
            if(!userData)
            {
                return res.status(404).json({status:false, message:"No User with this ID exists"});
            }
            // console.log(userData.deviceToken, "\nToken : ",req.headers.authorization.split(" ")[1]);
            if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
            {
                return res.status(401).json({status:false, message:"You have already logged-in with another device"});
            }
            else{
                assessmentData.tightnessTestDetails = tightnessTestDetails;
                assessmentData.leakageTestDetails = leakageTestDetails;
                
                const db = getDb();
                db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
                .then(resultData=>{
                    res.json({status:true, message:'Air-Tightness updated successfully',assessment:assessmentData});
                })
                .catch(err=>console.log(err));
            }
        })
    })

}


exports.addEditRecommendations = (req,res,next)=>{

    const assessmentNumber = req.body.assessmentNumber;

    const upgrades = req.body.upgrades;
    const recommendations = req.body.recommendations;
    const otherNote = req.body.otherNote;
    const brouchers = req.body.brouchers;
    const homeOwnerNotice = req.body.homeOwnerNotice;
    const advisorCheckList = req.body.advisorCheckList;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        User.findUserByUserId(assessmentData.userId)
        .then(userData=>{
            if(!userData)
            {
                return res.status(404).json({status:false, message:"No User with this ID exists"});
            }
            // console.log(userData.deviceToken, "\nToken : ",req.headers.authorization.split(" ")[1]);
            if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
            {
                return res.status(401).json({status:false, message:"You have already logged-in with another device"});
            }
            else{
                assessmentData.recommendations = recommendations;
                assessmentData.upgrades = upgrades;
                assessmentData.otherNote = otherNote;
                assessmentData.brouchers = brouchers;
                assessmentData.homeOwnerNotice = homeOwnerNotice;
                assessmentData.advisorCheckList = advisorCheckList;
                assessmentData.isSubmitted = 1;
                
                const db = getDb();
        
                db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
                .then(resultData=>{
                    res.json({status:true, message:'Recommendations updated successfully',assessment:assessmentData});
                })
                .catch(err=>console.log(err));
            }
        });
    })

}


exports.createNewAssessment = (req,res,next)=>{

    const userId = req.body.userId;
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const customerPhone = req.body.customerPhone;
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalCode;
    const yearBuilt = req.body.yearBuilt;
    const assessmentNumber = req.body.assessmentNumber;
    const apNumber = req.body.apNumber;
    const vermInsulation = +req.body.vermInsulation;
    const programmableThermostat = +req.body.programmableThermostat;
    const stoveType = +req.body.stoveType;
    const dryerType = +req.body.dryerType;
    const indoorTemp = req.body.indoorTemp;
    const indoorCF = req.body.indoorCF;
    const outdoorTemp = req.body.outdoorTemp;
    const outdoorCF = req.body.outdoorCF;
    const atypicalLoads = req.body.atypicalLoads;
    const lowFlowToiletCounts = +req.body.lowFlowToiletCounts;
    const totalToilets = +req.body.totalToilets;
    const exhaustFansCount = +req.body.exhaustFansCount;
    const rangeHoodsCount = +req.body.rangeHoodsCount;
    const houseFrontFacing = req.body.houseFrontFacing;
    const note = req.body.note;
    const assessmentType = +req.body.assessmentType;
    const houseSketches = req.body.houseSketches;
    const ceilingDetails = req.body.ceilingDetails;
    const heatingSystemDetails = req.body.heatingSystemDetails;
    const heatingSystemDetails2 = req.body.heatingSystemDetails2;
    const hotWaterSystemDetails = req.body.hotWaterSystemDetails;
    const ventilationSystemDetails = req.body.ventilationSystemDetails;
    const floorDetails = req.body.floorDetails;
    const tightnessTestDetails = req.body.tightnessTestDetails;
    const leakageTestDetails = req.body.leakageTestDetails;
    const upgrades = req.body.upgrades;
    const recommendations = req.body.recommendations;
    const otherNote = req.body.otherNote;
    const brouchers = req.body.brouchers;
    const homeOwnerNotice = req.body.homeOwnerNotice;
    const advisorCheckList = req.body.advisorCheckList;
    const xmlLink = "";
    const isSubmitted = 1;

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No user with this ID exists"});
        }
        // console.log(userData.deviceToken, "\nTOken : ",req.headers.authorization.split(" ")[1]);
        if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
        {
            return res.status(401).json({status:false, message:"You have already logged-in with another device"});
        }
        else{
            Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
            .then(assessmentData=>{
                if(assessmentData)
                {
                    return res.status(409).json({status:false, message:"Assessment with this number already exists"});
                }
                else{  //Create new assessment
                    Assessment.findAssessmentByApNumber(apNumber)
                    .then(assessmentDataAp=>{
                        // if(assessmentDataAp)
                        // {
                        //     return res.status(409).json({status:false, message:"Assessment with this AP number already exists"});
                        // }
            
                        const assessmentObj = new Assessment(userId,customerName,customerEmail,customerPhone,address,city,province,postalCode,yearBuilt,assessmentNumber,
                                                apNumber,vermInsulation,programmableThermostat,stoveType,dryerType,indoorTemp,indoorCF,outdoorTemp,outdoorCF,atypicalLoads,
                                                lowFlowToiletCounts,totalToilets,exhaustFansCount,rangeHoodsCount,houseFrontFacing,note,assessmentType,
                                                houseSketches,ceilingDetails,heatingSystemDetails,heatingSystemDetails2,hotWaterSystemDetails,ventilationSystemDetails,floorDetails,
                                                tightnessTestDetails,leakageTestDetails,upgrades,recommendations,otherNote,brouchers,homeOwnerNotice,
                                                advisorCheckList,xmlLink,isSubmitted);
            
                        //saving in database
                        return assessmentObj.save()
                        .then(resultData=>{
                        return res.json({status:true,message:"Pre-Assessment created successfully",assessment:resultData["ops"][0]});
                        })
                        .catch(err=>console.log(err));
                    })
                }
            })
        }
    })

}


exports.getAllPreAssessments = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    Assessment.fetchAllAssessments(skip,limit,0)
    .then(assessmentsData=>{
        if(assessmentsData.length==0)
        {
            return res.json({status:true, message:"All pre-assessment(s) returned",assessments:[]});            
        }
        assessmentsData = assessmentsData.filter(i=>{
            if(i.isSubmitted==0)
            {
                return false;
            }
            else{
                return true;
            }
        });
        let mappedAssessments = [];
        let allAssessments = assessmentsData.map(async i=>{
            i.userName = "";
            let userData = await User.findUserByUserId(i.userId);
            if(userData!=null)
            {
                i.userName = userData.fullName;
            }
            if(i.xmlLink==undefined)
            {
                i.xmlLink = "";
            }
            mappedAssessments.push(i);
            if(mappedAssessments.length==assessmentsData.length)
            {
                return res.json({status:true, message:"All pre-assessment(s) returned",assessments:assessmentsData});
            }
        });
    })
}


exports.getAllPreAssessmentsForParticularUser = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;
    const userId = req.query.userId;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    User.findUserByUserId(userId)
    .then(userData=>{
        if(!userData)
        {
            return res.status(404).json({status:false, message:"No user with this ID exists"});
        }
        let allowQuery = false;
        // verify, decode token
        jwt.verify(req.headers.authorization.split(" ")[1], 'myAppSecretKey', (err, payload) => {
            if (err)
            {
                return res.status(401).json({status:false, message:"You have already logged-in with another device"});
            }
            else if (payload.admin != undefined) {
                console.log("Admin");
                allowQuery = true;
            } 
            else {
                if(userData.deviceToken!=req.headers.authorization.split(" ")[1])
                {
                    return res.status(401).json({status:false, message:"You have already logged-in with another device"});
                }
                else{
                    allowQuery = true;
                }
            }
        });
        if(allowQuery)
        {
            Assessment.fetchAllAssessmentsByUser(skip,limit,userId,0)
            .then(assessmentsData=>{
                if(assessmentsData.length==0)
                {
                    return res.json({status:true, message:"All pre-assessment(s) returned",assessments:[]});            
                }
                assessmentsData = assessmentsData.filter(i=>{
                    if(i.isSubmitted==0)
                    {
                        return false;
                    }
                    else{
                        return true;
                    }
                });
                if(assessmentsData.length==0)
                {
                    return res.json({status:true, message:"All pre-assessment(s) returned",assessments:[]});            
                }
                let mappedAssessments = [];
                let allAssessments = assessmentsData.map(i=>{
                    if(i.xmlLink==undefined)
                    {
                        i.xmlLink = "";
                    }
                    mappedAssessments.push(i);
                    if(mappedAssessments.length==assessmentsData.length)
                    {
                        return res.json({status:true, message:"All pre-assessment(s) returned",assessments:assessmentsData});
                    }
                });
            })
        }  
    })
}


exports.getAllPostAssessmentsForParticularUser = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;
    const userId = req.query.userId;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    Assessment.fetchAllAssessmentsByUser(skip,limit,userId,1)
    .then(assessmentsData=>{
        assessmentsData = assessmentsData.filter(i=>{
            if(i.isSubmitted==0)
            {
                return false;
            }
            else{
                return true;
            }
        });
        return res.json({status:true, message:"All post-assessment(s) returned",assessments:assessmentsData});
    })

}


exports.getAllUserAssessments = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;
    const userId = req.params.userId;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    Assessment.fetchAllAssessmentsByUser(skip,limit,userId,-1)
    .then(assessmentsData=>{
        assessmentsData = assessmentsData.filter(i=>{
            if(i.isSubmitted==0)
            {
                return false;
            }
            else{
                return true;
            }
        });
        return res.json({status:true, message:"All user assessment(s) returned",assessments:assessmentsData});
    })

}


exports.getParticularAssessmentDetails = (req,res,next)=>{

    const assessmentNumber = req.params.assessmentNumber;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        return res.json({status:true, message:"Assessment exists", assessment:assessmentData});
    })

}


exports.editAssessmentXmlFile = (req,res,next)=>{

    const assessmentNumber = req.params.assessmentNumber;
    const xmlLink = req.body.xmlLink;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        assessmentData.xmlLink = xmlLink;
        
        const db = getDb();

        db.collection('assessments').updateOne({assessmentNumber:assessmentNumber},{$set:assessmentData})
        .then(resultData=>{
            res.json({status:true, message:'Assessment file updated successfully',assessment:assessmentData});
        })
        .catch(err=>console.log(err));
    })

}


exports.deleteParticularAssessment = (req,res,next)=>{

    const assessmentNumber = req.query.assessmentNumber;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }

        const db = getDb();

        db.collection('assessments').deleteOne({assessmentNumber:assessmentNumber})
        .then(resultData=>{
            res.json({status:true, message:'Assessment deleted successfully'});
        })
        .catch(err=>console.log(err));
    })

}


exports.getAllAssessmentsByNumber = (req,res,next)=>{

    const aNumber = req.body.aNumber.trim();

    Assessment.fetchAllAssessmentsByAssessmentNumber(aNumber)
    .then(assessmentData=>{
        // console.log(assessmentData);
        if(assessmentData.length==0)
        {
            return res.json({status:false, message:"No Assessment with this number exists",assessments:[]});
        }
        return res.json({status:true, message:"Assessment(s) exists",assessments:assessmentData});
    })
}


var request = require('request');

exports.generatePdf = (req,res,next)=>{

    const assessmentNumber = req.body.assessmentNumber;

    let pdfName = "PDF_"+assessmentNumber;
    console.log("PDF");
    // Create a document
    const doc = new PDFDocument();

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No Assessment with this number exists"});
        }

        let assessmentDate = new Date(assessmentData.creationTimeStamp);
        let dt = assessmentDate.getUTCDate().toString();
        if(dt.length==1)
        {
            dt = "0"+dt;
        }
        let mth = (assessmentDate.getUTCMonth() + 1).toString();
        if(mth.length==1)
        {
            mth = "0"+mth;
        }
        let yr = assessmentDate.getUTCFullYear().toString();
        assessmentDate = dt+'.'+mth+'.'+yr;
        // console.log(assessmentDate);

        // Saving the pdf file in root directory.
        doc.pipe(fs.createWriteStream('./newFileUploads/'+pdfName+'.pdf'));

        // Adding functionality
        // doc
        // .fontSize(27)
        // .text('This the article for GeeksforGeeks', 100, 100)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Date : ', 100, 40, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentDate)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Assessment Number : ', 100, 50, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentNumber)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('AP Number : ', 100, 60, {
            //here it is, 
            lineBreak : false,
        }).font('Helvetica').text(assessmentData.apNumber)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('', 430, 24, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').image('./newFileUploads/appLogo.jpeg', {
                    // fit: [80, 55],
                    width:82,
                    height:64,
                    align: 'center',
                    valign: 'center'
                });

        doc.fontSize(10).font('Helvetica')
            // .fillColor('red')
        .text('__________________________________________________________________________', 100, 80);

        // Customer Details
        doc
        .fontSize(12).font('Helvetica-Bold')
        .text('1. Customer Details - ', 100, 110, {
            //here it is, 
            lineBreak : false,listType:'bullets'
        }).font('Helvetica').text('')

        //Add Customer Details
        doc.fontSize(10).font('Helvetica-Bold').text('', 120, 130 ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Add Customer Details:-'],{bulletIndent:120, textIndent:10});

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Name : ', 130, 150, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.customerName)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Mobile : ', 130, 162, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.customerPhone)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Email : ', 130, 174, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.customerEmail)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Address : ', 130, 186, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.address)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('City : ', 130, 198, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.city)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Province : ', 130, 210, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.province)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Postal Code : ', 130, 222, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.postalCode)

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Year Build : ', 130, 234, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.yearBuilt)

        //Others Details
        doc.fontSize(10).font('Helvetica-Bold').text('', 120, 260 ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Others Details:-'],{bulletIndent:120, textIndent:10});

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Does the house has Vermiculite insulation : ', 130, 280, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.vermInsulation==0?'No':'Yes')

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Does the house has Programmable Thermostat : ', 130, 295, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.programmableThermostat==0?'No':'Yes')

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Type of stove : ', 130, 310, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.stoveType==0?'Electric':(assessmentData.stoveType==1?'Natural Gas':'Propane'))

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Type of dryer : ', 130, 325, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.dryerType==0?'Electric':(assessmentData.dryerType==1?'Natural Gas':'Propane'))

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Temperature : ', 130, 350, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text('')

        doc.fontSize(10).font('Helvetica-Bold').text('', 140, 365 ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Indoor:-'],{bulletIndent:140, textIndent:10});

        doc
        .fontSize(10).font('Helvetica').text(assessmentData.indoorTemp+' '+assessmentData.indoorCF,200,350,{
            //here it is, 
            lineBreak : false
        })

        doc.fontSize(10).font('Helvetica-Bold').text('', 140, 377 ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Outdoor:-'],{bulletIndent:140, textIndent:10});

        doc
        .fontSize(10).font('Helvetica').text(assessmentData.outdoorTemp+' '+assessmentData.outdoorCF,200,377,{
            //here it is, 
            lineBreak : false
        })

        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Atypical Loads : ', 130, 405, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text('')

        let lastHeight = 408;
        for(let i=0;i<assessmentData.atypicalLoads.length;i++)
        {
            lastHeight = lastHeight+(11);
            // console.log("At load : ",lastHeight);
            doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
                //here it is, 
                lineBreak : true})
            doc.fontSize(10).list([assessmentData.atypicalLoads[i]],{bulletIndent:140, textIndent:10});
        }
        
        // console.log(lastHeight);
        lastHeight = lastHeight+25;
        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Toilets count : ', 130, lastHeight, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text('')

        lastHeight = lastHeight+13;
        doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(["Number of low flow toilets - "+assessmentData.lowFlowToiletCounts],{bulletIndent:140, textIndent:10});
        
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(["Total toilets - "+assessmentData.totalToilets],{bulletIndent:140, textIndent:10});

        lastHeight = lastHeight+25;
        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Ventilation system : ', 130, lastHeight, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text('')

        lastHeight = lastHeight+13;
        doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(["Number of exhaust fans - "+assessmentData.exhaustFansCount],{bulletIndent:140, textIndent:10});
        
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(["Number of range hoods - "+assessmentData.rangeHoodsCount],{bulletIndent:140, textIndent:10});

        lastHeight = lastHeight+25;
        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Facing of the house front : ', 130, lastHeight, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text(assessmentData.houseFrontFacing)

        lastHeight = lastHeight+25;
        doc
        .fontSize(10).font('Helvetica-Bold')
        .text('Any other note :- ', 130, lastHeight, {
            //here it is, 
            lineBreak : false
        }).font('Helvetica').text("(Note)")

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list([assessmentData.note],{bulletIndent:140, textIndent:10});

        lastHeight = lastHeight+30;
        doc.fontSize(10).font('Helvetica')
            // .fillColor('red')
        .text('__________________________________________________________________________', 100,lastHeight);

         // House sketches Details
        lastHeight = lastHeight+30;
        // console.log(lastHeight);
        if(lastHeight>=700)
        {
            doc.addPage();
            lastHeight = 40;
        }
        doc
        .fontSize(12).font('Helvetica-Bold')
        .text('2. House sketches Details - ', 100, lastHeight, {
            //here it is, 
            lineBreak : false,listType:'bullets'
        }).font('Helvetica').text('')

        lastHeight = lastHeight+20;
        // console.log(lastHeight);
        if(lastHeight>=700)
        {
            doc.addPage();
            lastHeight = 40;
        }
        
        doc.fontSize(10).font('Helvetica-Bold').text('', 120, lastHeight ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Name - '],{bulletIndent:120, textIndent:10});

        doc
        .fontSize(10).font('Helvetica').text(assessmentData.houseSketches.name,180,lastHeight,{
            //here it is, 
            lineBreak : false
        })

        lastHeight = lastHeight+12;
        // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     // doc.addPage();
        //     lastHeight = 40;
        // }
        doc.fontSize(10).font('Helvetica').text('', 120, lastHeight ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Sketch Image - '],{bulletIndent:120, textIndent:10});

        doc
        .fontSize(10).font('Helvetica').text('',180,lastHeight,{
            //here it is, 
            lineBreak : false
        })
      
        lastHeight = lastHeight+200;
        // console.log(lastHeight);
        if(lastHeight>=700)
        {
            doc.addPage();
            lastHeight = 40 + 250;
        }
        // Adding an image in the pdf
        let houseSketchImg = assessmentData.houseSketches.sketchUrl.split('/')[5];
        // console.log(houseSketchImg);
        try{
            doc.image('./newFileUploads/'+houseSketchImg, {
                fit: [340, 250],
                align: 'center',
                valign: 'center'
            });
        }
        catch(exception)
        {
            console.log("Image not found");
            doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
                fit: [340, 250],
                align: 'center',
                valign: 'center'
            });
        }
        
        lastHeight = lastHeight+30;
        doc.fontSize(10).font('Helvetica')
            // .fillColor('red')
        .text('__________________________________________________________________________', 100,lastHeight);
      
        // House Details
        lastHeight = lastHeight+30;
        doc
        .fontSize(12).font('Helvetica-Bold')
        .text('3. House Details - ', 100, lastHeight, {
            //here it is, 
            lineBreak : false,listType:'bullets'
        }).font('Helvetica').text('')

        lastHeight = lastHeight+20;
        //Add Ceiling details
        doc.fontSize(10).font('Helvetica-Bold').text('', 120, lastHeight ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Ceiling details:-'],{bulletIndent:120, textIndent:10});

        for(let i=0;i<assessmentData.ceilingDetails.length;i++)
        {
            if(i==0)
            {
                lastHeight = lastHeight + 13;
            }
            else{
                lastHeight = lastHeight+((i+1)*9);
            }
            doc.fontSize(10).font('Helvetica').text('',140,lastHeight,{
                //here it is, 
                lineBreak:true,indent:20,textIndent:20})
            doc.fontSize(10)
            // .fillColor('darkblue')
            .list(["Ceiling Name : "+assessmentData.ceilingDetails[i].name],{bulletIndent:140,textIndent:10});
            
            lastHeight = lastHeight+11;
            doc.fontSize(10).fillColor('black')
            .text('Ceiling Type : '+assessmentData.ceilingDetails[i].ceilingType,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Ceiling Sub-Type : '+assessmentData.ceilingDetails[i].ceilingSubType,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Truss type : '+assessmentData.ceilingDetails[i].trussType,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Truss spacing : '+assessmentData.ceilingDetails[i].trussSpacing,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Truss thickness : '+assessmentData.ceilingDetails[i].trussThickness,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Truss width : '+assessmentData.ceilingDetails[i].trussWidth,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Heel height(ft) : '+assessmentData.ceilingDetails[i].heelHeight,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Insulation type : '+assessmentData.ceilingDetails[i].insulationType,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Insulation material type : '+assessmentData.ceilingDetails[i].insulationMaterialType,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Insulation depth(in) : '+assessmentData.ceilingDetails[i].insulationDepth,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Vented Attic : '+assessmentData.ceilingDetails[i].ventedAttic,{lineBreak:true,indent:10})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Note : '+assessmentData.ceilingDetails[i].note,{lineBreak:true,indent:10})

            // console.log(lastHeight);
            if(lastHeight>=700)
            {
                // doc.addPage();
                lastHeight = 40;
            }
        }

        lastHeight = lastHeight+25;
        //Add Ceiling details
        doc.fontSize(10).font('Helvetica-Bold').text('', 120, lastHeight ,{
            //here it is, 
            lineBreak : true})
        doc.fontSize(10).list(['Heating System details 1 :-'],{bulletIndent:120, textIndent:10});

        for(let i=0;i<assessmentData.heatingSystemDetails.length;i++)
        {
            if(i==0)
            {
                lastHeight = lastHeight + 13;
            }
            else{
                lastHeight = lastHeight+((i+1)*9);
            }

            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }

            doc.fontSize(10).font('Helvetica').text('',{
                //here it is
                lineBreak:true,indent:20,textIndent:20})
            doc.fontSize(10)
            // .fillColor('darkblue')
            .list(["Energy Source : "+assessmentData.heatingSystemDetails[i].fuelType],{bulletIndent:140, indent:15,textIndent:10});
            
            lastHeight = lastHeight+11;
            doc.fontSize(10).fillColor('black')
            .text('System Type : '+assessmentData.heatingSystemDetails[i].systemType,{lineBreak:true,indent:24})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Model : '+assessmentData.heatingSystemDetails[i].model,{lineBreak:true,indent:24})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Heat Pump : ',{lineBreak:true,indent:24})
            if(assessmentData.heatingSystemDetails[i].heatPump!=undefined)
            {
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Cooling Efficiency : '+assessmentData.heatingSystemDetails[i].heatPump.coolingEfficiency,{lineBreak:true,indent:34})
    
                lastHeight = lastHeight+11;
                // console.log(lastHeight);
                // if(lastHeight>=700)
                // {
                //     // doc.addPage();
                //     lastHeight = 40;
                // }
                doc.fontSize(10)
                .text('Cooling Value : '+assessmentData.heatingSystemDetails[i].heatPump.coolingValue,{lineBreak:true,indent:34})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Efficiency Type : '+assessmentData.heatingSystemDetails[i].heatPump.efficiencyType,{lineBreak:true,indent:34})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Efficiency Value : '+assessmentData.heatingSystemDetails[i].heatPump.efficiencyValue,{lineBreak:true,indent:34})    
            }

            lastHeight = lastHeight+11;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     // doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10)
            .text('Manufacturer : '+assessmentData.heatingSystemDetails[i].manufacturer,{lineBreak:true,indent:24})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Year : '+assessmentData.heatingSystemDetails[i].year,{lineBreak:true,indent:24})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Input : '+assessmentData.heatingSystemDetails[i].input,{lineBreak:true,indent:24})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Output : '+assessmentData.heatingSystemDetails[i].output,{lineBreak:true,indent:24})

            lastHeight = lastHeight+11;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            if(assessmentData.heatingSystemDetails[i].boiler!=undefined)
            {
                doc.fontSize(10)
                .text('Boiler Efficiency : '+assessmentData.heatingSystemDetails[i].boiler.efficiencyBoiler,{lineBreak:true,indent:24})
            }
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Equipment Type : '+assessmentData.heatingSystemDetails[i].details,{lineBreak:true,indent:24,paragraphGap:3})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Equipment Heating : '+assessmentData.heatingSystemDetails[i].efficiencyHeating,{lineBreak:true,indent:24,paragraphGap:3})
        }

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});

        lastHeight = lastHeight+25;
        //Add Ceiling details
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:10,textIndent:10})
        doc.fontSize(10).list(['Heating System details 2 :-'],{bulletIndent:120, indent:3,textIndent:10});

        lastHeight = lastHeight+13;
        doc.fontSize(10).font('Helvetica')
        .text('Energy Star : '+assessmentData.heatingSystemDetails2.energyStar, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Equipment Type : '+assessmentData.heatingSystemDetails2.equipmentType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('System Type : '+assessmentData.heatingSystemDetails2.systemType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Note : '+assessmentData.heatingSystemDetails2.note, {lineBreak:true,indent:13})
        
        
        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});

        lastHeight = lastHeight+25;
        //Add Ceiling details
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:10,textIndent:10})
        doc.fontSize(10).list(['Hot-Water System details:-'],{bulletIndent:120, indent:3,textIndent:10});

        lastHeight = lastHeight+13;
        doc.fontSize(10).font('Helvetica')
        .text('Fuel Type : '+assessmentData.hotWaterSystemDetails.fuelType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('System Type : '+assessmentData.hotWaterSystemDetails.systemType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Model : '+assessmentData.hotWaterSystemDetails.model, {lineBreak:true,indent:13})
        
        lastHeight = lastHeight+20;
        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     doc.addPage();
        //     lastHeight = 40;
        // }
        doc.fontSize(10)
        .text('Manufacturer : '+assessmentData.hotWaterSystemDetails.manufacturerName, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Year : '+assessmentData.hotWaterSystemDetails.year, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Capacity : '+assessmentData.hotWaterSystemDetails.input, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Tank Volume : '+assessmentData.hotWaterSystemDetails.output, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Insulation Type : '+assessmentData.hotWaterSystemDetails.insulationType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Drain Water Recovery : '+assessmentData.hotWaterSystemDetails.drainWaterRecovery, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Combined Fuel : '+assessmentData.hotWaterSystemDetails.combinedFlue, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Fuel Diameter : '+assessmentData.hotWaterSystemDetails.flueDiameter, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Efficiency : '+assessmentData.hotWaterSystemDetails.efficiency, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('EF : '+assessmentData.hotWaterSystemDetails.eF, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Note : '+assessmentData.hotWaterSystemDetails.note, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Details : '+assessmentData.hotWaterSystemDetails.details, {lineBreak:true,indent:13,paragraphGap:6})

        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     // doc.addPage();
        //     lastHeight = 40;
        // }

        lastHeight = lastHeight+25;
        //Add Ventilation system details
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:10,textIndent:10})
        doc.fontSize(10).list(['Ventilation System details:-'],{bulletIndent:120, indent:3,textIndent:10});

        lastHeight = lastHeight+13;
        doc.fontSize(10).font('Helvetica')
        .text('CFM : '+assessmentData.ventilationSystemDetails.cfm, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('System Type : '+assessmentData.ventilationSystemDetails.systemType, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Model : '+assessmentData.ventilationSystemDetails.model, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Manufacturer : '+assessmentData.ventilationSystemDetails.manufacturerName, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Exhaust Fans : '+assessmentData.ventilationSystemDetails.exhaustFans, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Hood Exhaust Range : '+assessmentData.ventilationSystemDetails.hoodExhaustRange, {lineBreak:true,indent:13})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Note : '+assessmentData.ventilationSystemDetails.note, {lineBreak:true,indent:13,paragraphGap:6})

        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     // doc.addPage();
        //     lastHeight = 40;
        // }
        
        lastHeight = lastHeight+25;
        //Add Ceiling details
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:10,textIndent:10})
        doc.fontSize(10).list(['Floor details:-'],{bulletIndent:120, indent:3,textIndent:10});

        for(let i=0;i<assessmentData.floorDetails.length;i++)
        {
            if(i==0)
            {
                lastHeight = lastHeight + 13;
            }
            else{
                lastHeight = lastHeight+((i+1)*10);
            }

            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }

            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:20,textIndent:10})
            doc.fontSize(10)
            // .fillColor('darkblue')
            .list(["Floor Type : "+assessmentData.floorDetails[i].floorType],{bulletIndent:140, indent:15,textIndent:10});
            
            if(assessmentData.floorDetails[i].floorType=="Basement/CG/SOG")
            {
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Above Grade : '+assessmentData.floorDetails[i].basementCG.aboveGrade, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Above Grade Foundation Type : ', {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Exterior Insulation : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveExteriorInsulation, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Exterior Thickness : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveExteriorThickness, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Interior Insulation : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveInteriorInsulation, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Interior Thickness : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveInteriorThickness, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Main Component : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveMainComponent, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Main Component Thickness : '+assessmentData.floorDetails[i].basementCG.aboveGradeFoundationType.aboveMainComponentThickness, {lineBreak:true,indent:36})

                lastHeight = lastHeight+15;
                doc.fontSize(10)
                .text('Below Grade : '+assessmentData.floorDetails[i].basementCG.belowGrade, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Below Grade Foundation Type : ', {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Exterior Insulation : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowExteriorInsulation, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Exterior Thickness : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowExteriorThickness, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Interior Insulation : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowInteriorInsulation, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Interior Thickness : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowInteriorThickness, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Main Component : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowMainComponent, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Main Component Thickness : '+assessmentData.floorDetails[i].basementCG.belowGradeFoundationType.belowMainComponentThickness, {lineBreak:true,indent:36})

                lastHeight = lastHeight+15;
                // console.log(lastHeight);
                // if(lastHeight>=700)
                // {
                //     doc.addPage();
                //     lastHeight = 40;
                // }
                doc.fontSize(10)
                .text('Foundation Type : '+assessmentData.floorDetails[i].basementCG.foundationType, {lineBreak:true,indent:24})
                lastHeight = lastHeight+12;
                doc.fontSize(10)
                .text('Header Insulated : ', {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Entire : '+assessmentData.floorDetails[i].basementCG.headerInsulated.headerEntire, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Insulation : '+assessmentData.floorDetails[i].basementCG.headerInsulated.headerInsulation, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Length : '+assessmentData.floorDetails[i].basementCG.headerInsulated.headerLenght, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Thickness : '+assessmentData.floorDetails[i].basementCG.headerInsulated.headerThickness, {lineBreak:true,indent:36})
                
                lastHeight = lastHeight+15;
                doc.fontSize(10)
                .text('Pony Wall : '+assessmentData.floorDetails[i].basementCG.ponyWall, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Pony Wall Type : ', {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Finish : '+assessmentData.floorDetails[i].basementCG.ponyWallType.ponyFinish, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Framing : '+assessmentData.floorDetails[i].basementCG.ponyWallType.ponyFraming, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Height : '+assessmentData.floorDetails[i].basementCG.ponyWallType.ponyHeight, {lineBreak:true,indent:36})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Insulation : '+assessmentData.floorDetails[i].basementCG.ponyWallType.ponyInsulation, {lineBreak:true,indent:36,paragraphGap:3})
                
            }
            else{
                lastHeight = lastHeight+15;
                doc.fontSize(10)
                .text('Exterior Insulation Thickness : '+assessmentData.floorDetails[i].floor1.exteriorInsulationThickness, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Exterior Insulation Type : '+assessmentData.floorDetails[i].floor1.exteriorInsulationType, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Framing Space : '+assessmentData.floorDetails[i].floor1.framingSpace, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Framing Type : '+assessmentData.floorDetails[i].floor1.framingType, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Height : '+assessmentData.floorDetails[i].floor1.height, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Insulation Thickness : '+assessmentData.floorDetails[i].floor1.insulationThickness, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Insulation Type : '+assessmentData.floorDetails[i].floor1.insulationType, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Length : '+assessmentData.floorDetails[i].floor1.length, {lineBreak:true,indent:24})
                lastHeight = lastHeight+11;
                doc.fontSize(10)
                .text('Wall Thickness : '+assessmentData.floorDetails[i].floor1.thicknessWall, {lineBreak:true,indent:24,paragraphGap:3})
              
            }

            if(assessmentData.floorDetails[i].doorDetails!=undefined)
            {
                lastHeight = lastHeight + 16;
                doc.fontSize(10)
                .text('Door Details : ', {lineBreak:true,indent:24})
                for(let d=0;d<assessmentData.floorDetails[i].doorDetails.length;d++)
                {
                    lastHeight = lastHeight+11;
                    // doc.fontSize(10).font('Helvetica').text('',160,lastHeight,{
                    //     //here it is, 
                    //     lineBreak : true})
                    doc.fontSize(10)
                    // .fillColor('darkblue')
                    .list(["Height : "+assessmentData.floorDetails[i].doorDetails[d].doorHeight],{bulletIndent:160, indent:32,textIndent:8});
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Type : '+assessmentData.floorDetails[i].doorDetails[d].doorType, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Width : '+assessmentData.floorDetails[i].doorDetails[d].doorWidth, {lineBreak:true,indent:39,paragraphGap:3})
                }
            }

            if(assessmentData.floorDetails[i].windowDetails!=undefined)
            {
                lastHeight = lastHeight + 16;
                doc.fontSize(10)
                .text('Window Details : ', {lineBreak:true,indent:24})
                for(let w=0;w<assessmentData.floorDetails[i].windowDetails.length;w++)
                {
                    lastHeight = lastHeight+13;
                    // doc.fontSize(10).font('Helvetica').text('',160,lastHeight,{
                    //     //here it is, 
                    //     lineBreak : true})
                    doc.fontSize(10)
                    // .fillColor('darkblue')
                    .list(["Frame Type : "+assessmentData.floorDetails[i].windowDetails[w].frameType],{bulletIndent:160, indent:32,textIndent:8});
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Gazing Type : '+assessmentData.floorDetails[i].windowDetails[w].gazingType, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    // console.log(lastHeight);
                    // if(lastHeight>=700)
                    // {
                    //     doc.addPage();
                    //     lastHeight = 40;
                    // }
                    doc.fontSize(10)
                    .text('Header Height : '+assessmentData.floorDetails[i].windowDetails[w].headerHeight, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Height : '+assessmentData.floorDetails[i].windowDetails[w].height, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Orientation : '+assessmentData.floorDetails[i].windowDetails[w].orientation, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Over HangWidth : '+assessmentData.floorDetails[i].windowDetails[w].overHangWidth, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Quantity : '+assessmentData.floorDetails[i].windowDetails[w].quantity, {lineBreak:true,indent:39})
    
                    lastHeight = lastHeight+11;
                    // console.log(lastHeight);
                    // if(lastHeight>=700)
                    // {
                    //     // doc.addPage();
                    //     lastHeight = 40;
                    // }
                    doc.fontSize(10)
                    .text('Spacer Type : '+assessmentData.floorDetails[i].windowDetails[w].spacerType, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Width : '+assessmentData.floorDetails[i].windowDetails[w].width, {lineBreak:true,indent:39})
                    lastHeight = lastHeight+11;
                    doc.fontSize(10)
                    .text('Window Type : '+assessmentData.floorDetails[i].windowDetails[w].windowType, {lineBreak:true,indent:39,paragraphGap:3})
                }
            }

        }

        lastHeight = lastHeight+30;
        doc.fontSize(10).font('Helvetica')
            // .fillColor('red')
        .text('__________________________________________________________________________', {lineBreak:true,indent:8});

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:4});

        // Air Tightness Details
        lastHeight = lastHeight+30;
        doc
        .fontSize(12).font('Helvetica-Bold')
        .text('4. Air Tightness Details - ', {
            //here it is, 
            lineBreak : true,listType:'bullets',paragraphGap:2
        }).font('Helvetica').text('',{lineBreak:true, indent:4,paragraphGap:4})

        lastHeight = lastHeight+20;
        //Tightness Test details
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Tightness Test details:-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text('Blower Door Photo : '+assessmentData.tightnessTestDetails.blowerDoorPhoto, {lineBreak:true,indent:38})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text('Equipment Make : '+assessmentData.tightnessTestDetails.equipmentMake, {lineBreak:true,indent:38})
        lastHeight = lastHeight+11;
        doc.fontSize(10).font('Helvetica')
        .text('Equipment Model : '+assessmentData.tightnessTestDetails.equipmentModel, {lineBreak:true,indent:38})
        lastHeight = lastHeight+11;
        doc.fontSize(10).font('Helvetica')
        .text('Initial House Pressure : '+assessmentData.tightnessTestDetails.initialHousePressure, {lineBreak:true,indent:38})
        lastHeight = lastHeight+11;
        doc.fontSize(10).font('Helvetica')
        .text('Final House Pressure : '+assessmentData.tightnessTestDetails.finalHousePressure, {lineBreak:true,indent:38})

        lastHeight = lastHeight + 14;
        doc.fontSize(10)
        .text('Pressure Readings : ', {lineBreak:true,indent:38})
        for(let d=0;d<assessmentData.tightnessTestDetails.pressureReadings.length;d++)
        {
            lastHeight = lastHeight+12;
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:45})
            doc.fontSize(10)
            .list(["Fan Flow : "+assessmentData.tightnessTestDetails.pressureReadings[d].fanFlow],{bulletIndent:140, indent:45,textIndent:10});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('House Pressure : '+assessmentData.tightnessTestDetails.pressureReadings[d].housePressure, {lineBreak:true,indent:54})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Ring : '+assessmentData.tightnessTestDetails.pressureReadings[d].ring, {lineBreak:true,indent:54,paragraphGap:2})
        }

        lastHeight = lastHeight + 14;
        doc.fontSize(10)
        .text('Combustion Safety Test : ', {lineBreak:true,indent:38})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Bathroom Fans : '+assessmentData.tightnessTestDetails.combustionSafetyTest.bathroomFans, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Central Vac : '+assessmentData.tightnessTestDetails.combustionSafetyTest.centralVac, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Dryer : '+assessmentData.tightnessTestDetails.combustionSafetyTest.dryer, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Range Hood : '+assessmentData.tightnessTestDetails.combustionSafetyTest.rangeHood, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Start : '+assessmentData.tightnessTestDetails.combustionSafetyTest.start, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Final : '+assessmentData.tightnessTestDetails.combustionSafetyTest.final, {lineBreak:true,indent:48})
        lastHeight = lastHeight+11;
        doc.fontSize(10)
        .text('Pressure Difference : '+assessmentData.tightnessTestDetails.combustionSafetyTest.pressureDifference, {lineBreak:true,indent:48,paragraphGap:5})

        lastHeight = lastHeight+20;
        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     doc.addPage();
        //     lastHeight = 40;
        // }
        //Leakage Test details
        doc.fontSize(10).font('Helvetica-Bold').text('', {
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Leakage Test details:-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});
        
        lastHeight = lastHeight + 14;
        doc.fontSize(10)
        .text('Home Owner : '+assessmentData.leakageTestDetails.homeOwner, {lineBreak:true,indent:38})

        lastHeight = lastHeight + 14;
        doc.fontSize(10)
        .text('Mark Location : '+assessmentData.leakageTestDetails.markLocation, {lineBreak:true,indent:38})

        lastHeight = lastHeight + 14;
        doc.fontSize(10)
        .text('Basements : ', {lineBreak:true,indent:38})
        for(let d=0;d<assessmentData.leakageTestDetails.basements.length;d++)
        {
            lastHeight = lastHeight+12;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak:true,indent:45})
            doc.fontSize(10)
            .list(["Name : "+assessmentData.leakageTestDetails.basements[d].name],{bulletIndent:140, indent:45,textIndent:10});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Comment : '+assessmentData.leakageTestDetails.basements[d].comment, {lineBreak:true,indent:54,paragraphGap:2})
        }

        lastHeight = lastHeight + 15;
        doc.fontSize(10).font('Helvetica-Bold')
        .text('Ceiling : ', {lineBreak:true,indent:38})
        for(let d=0;d<assessmentData.leakageTestDetails.ceiling.length;d++)
        {
            lastHeight = lastHeight+12;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:45})
            doc.fontSize(10)
            .list(["Name : "+assessmentData.leakageTestDetails.ceiling[d].name],{bulletIndent:140, indent:45,textIndent:10});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Comment : '+assessmentData.leakageTestDetails.ceiling[d].comment, {lineBreak:true,indent:54,paragraphGap:2})
        }

        lastHeight = lastHeight + 15;
        doc.fontSize(10).font('Helvetica-Bold')
        .text('Main : ', {lineBreak:true,indent:38})
        for(let d=0;d<assessmentData.leakageTestDetails.main.length;d++)
        {
            lastHeight = lastHeight+12;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:45})
            doc.fontSize(10)
            .list(["Name : "+assessmentData.leakageTestDetails.main[d].name],{bulletIndent:140, indent:45,textIndent:10});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Comment : '+assessmentData.leakageTestDetails.main[d].comment, {lineBreak:true,indent:54,paragraphGap:2})
        }

        lastHeight = lastHeight + 15;
        doc.fontSize(10).font('Helvetica-Bold')
        .text('Other Levels : ', {lineBreak:true,indent:38})
        for(let d=0;d<assessmentData.leakageTestDetails.otherLevels.length;d++)
        {
            lastHeight = lastHeight+12;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:45})
            doc.fontSize(10)
            .list(["Name : "+assessmentData.leakageTestDetails.otherLevels[d].name],{bulletIndent:140, indent:45,textIndent:10});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Comment : '+assessmentData.leakageTestDetails.otherLevels[d].comment, {lineBreak:true,indent:54,paragraphGap:2})
        }

        lastHeight = lastHeight + 15;
        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     doc.addPage();
        //     lastHeight = 40;
        // }
        doc.fontSize(10)
        .text('Note : '+assessmentData.leakageTestDetails.note, {lineBreak:true,indent:38})

        lastHeight = lastHeight+30;
        // // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     doc.addPage();
        //     lastHeight = 40;
        // }
        doc.fontSize(10).font('Helvetica')
            // .fillColor('red')
        .text('__________________________________________________________________________', {lineBreak:true,indent:8});

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:4});

        // Recommendations Details
        lastHeight = lastHeight+30;
        // console.log(lastHeight);
        // if(lastHeight>=700)
        // {
        //     doc.addPage();
        //     lastHeight = 40;
        // }
        doc
        .fontSize(12).font('Helvetica-Bold')
        .text('5. Recommendations - ', {
            //here it is, 
            lineBreak : true,listType:'bullets',paragraphGap:2
        }).font('Helvetica').text('',{lineBreak:true, indent:4,paragraphGap:4})

        lastHeight = lastHeight+20;
        //Upgrades
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Upgrades:-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        for(let d=0;d<assessmentData.upgrades.length;d++)
        {
            let aName = assessmentData.upgrades[d]["name"];
            //change-multi-line-strings-to-single-line
            aName = aName.replace(/\n/g, ' ');
            lastHeight = lastHeight+12;
            // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica').text('',{
                //here it is, 
                lineBreak : true,indent:10})
            doc.fontSize(10)
            .list(["Name : "+aName],{bulletIndent:140, indent:35});
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Duration : '+assessmentData.upgrades[d].duration,{lineBreak:true,indent:46})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Priority : '+assessmentData.upgrades[d].priority,{lineBreak:true,indent:46})
            lastHeight = lastHeight+11;
            doc.fontSize(10)
            .text('Comment : '+assessmentData.upgrades[d].comment,{lineBreak:true,indent:46,paragraphGap:3})
        }

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:2});

        lastHeight = lastHeight+20;
        //Recommendations
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Recommendations:-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        for(let d=0;d<assessmentData.recommendations.length;d++)
        {
            // lastHeight = lastHeight+12;
            // // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica')
            .text(assessmentData.recommendations[d],{lineBreak:true,indent:35})
        }

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});

        lastHeight = lastHeight+20;
        //Other Note
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Other Note :- '+assessmentData.otherNote],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});
        
        lastHeight = lastHeight+20;
        //Brouchers
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Brouchers:-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        for(let d=0;d<assessmentData.brouchers.length;d++)
        {
            lastHeight = lastHeight+12;
            // // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            doc.fontSize(10).font('Helvetica')
            .text(assessmentData.brouchers[d],{lineBreak:true,indent:35})
        }

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});
        
        lastHeight = lastHeight+20;
        //Brouchers
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Home Owner Notice :-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("AP Number : "+assessmentData.homeOwnerNotice.apNumber,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Date Energy Team : "+assessmentData.homeOwnerNotice.dateEnergyTeam,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Date Home Owner : "+assessmentData.homeOwnerNotice.dateHomeOwner,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Email : "+assessmentData.homeOwnerNotice.email,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Energy Advisor Name : "+assessmentData.homeOwnerNotice.energyAdvisorName,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("File Number : "+assessmentData.homeOwnerNotice.fileNumber,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Representative Name : "+assessmentData.homeOwnerNotice.nameOfRepresentative,{lineBreak:true,indent:35})

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Signature Energy Team : ",{lineBreak:true,indent:35})

        // Adding an image in the pdf
        let energyTeamSignatureImg = assessmentData.homeOwnerNotice.signatureEnergyTeam.split('/')[5];
        // console.log(energyTeamSignatureImg);
        try{
            doc.image('./newFileUploads/'+energyTeamSignatureImg, {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        catch(exception)
        {
            console.log("Image not found");
            doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        // doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
        //     fit: [200, 200],
        //     align: 'right',
        //     // valign: 'center',
        //     indent:55
        // });

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:1});
        
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Signature Home Owner : ",{lineBreak:true,indent:35})

        // Adding an image in the pdf
        let homeOwnerSignatureImg = assessmentData.homeOwnerNotice.signatureHomeOwner.split('/')[5];
        // console.log(homeOwnerSignatureImg);
        try{
            doc.image('./newFileUploads/'+homeOwnerSignatureImg, {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        catch(exception)
        {
            console.log("Image not found");
            doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        // doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
        //     fit: [200, 200],
        //     align: 'right',
        //     // valign: 'center',
        //     indent:55
        // });
        
        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:3});
        
        lastHeight = lastHeight+20;
        //Brouchers
        doc.fontSize(10).font('Helvetica-Bold').text('',{
            //here it is, 
            lineBreak : true,indent:20,textIndent:10})
        doc.fontSize(10).list(['Advisor Check List :-'],{bulletIndent:120, indent:20,textIndent:10,paragraphGap:2});

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Applicant Number : "+assessmentData.advisorCheckList.applicantNumber,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Date : "+assessmentData.advisorCheckList.date,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Service Organization : "+assessmentData.advisorCheckList.serviceOrganization,{lineBreak:true,indent:35})
        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica')
        .text("Steps : ",{lineBreak:true,indent:35,paragraphGap:3})

        for(let d=0;d<assessmentData.advisorCheckList.steps.length;d++)
        {
            lastHeight = lastHeight+12;
            // // console.log(lastHeight);
            // if(lastHeight>=700)
            // {
            //     doc.addPage();
            //     lastHeight = 40;
            // }
            // doc.fontSize(10).font('Helvetica').text('',{
            //     //here it is, 
            //     lineBreak : true,indent:10})
            // doc.fontSize(10)
            // .list([assessmentData.advisorCheckList.steps[d]],{bulletIndent:140, indent:45,textIndent:45});
            // doc.fontSize(10).font('Helvetica')
            
            doc.fontSize(10).font('Helvetica')
            .text((d+1)+") "+assessmentData.advisorCheckList.steps[d],{lineBreak:true,indent:45,align: 'justified',paragraphGap:1})
        }

        //For spacing (line break)
        doc.fontSize(10)
        .text(' ',{paragraphGap:2});

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica-Bold')
        .text("Energy Advisor Name : "+assessmentData.advisorCheckList.energyAdvisorName,{lineBreak:true,indent:35})

        lastHeight = lastHeight+12;
        doc.fontSize(10).font('Helvetica-Bold')
        .text("Signature : ",{lineBreak:true,indent:35})

        // Adding an image in the pdf
        let energyAdvisorSignatureImg = assessmentData.advisorCheckList.signature.split('/')[5];
        // console.log(energyAdvisorSignatureImg);
        try{
            doc.image('./newFileUploads/'+energyAdvisorSignatureImg, {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        catch(exception)
        {
            console.log("Image not found");
            doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
                fit: [200, 200],
                align: 'right',
                // valign: 'center',
                indent:55
            });
        }
        // doc.image('./newFileUploads/1657769276956AddEditAirTightnessDetails.png', {
        //     fit: [200, 200],
        //     align: 'right',
        //     // valign: 'center',
        //     indent:55
        // });

        // request({
        //     url: 'http://134.209.151.175/api/download/1650291198855IIT-NEET.png',
        //     encoding: null // Prevents Request from converting response to string
        //     }, function(err, response, body) {
        //     if (err) throw err;
        //         console.log(body);
                
        //     doc.image(body, {
        //         	fit: [300, 300],
        //         	align: 'center',
        //         	valign: 'center'});
        //     //   doc.text('HOLIDAYS - 125 Fortime',80,165,{align:'center'})
        //     //   doc.text('Hello this is a demo file',100,200)
        // })

        // doc
        // .addPage()
        // .fontSize(15)
        // .text('Generating PDF with the help of pdfkit', 100, 100);

        // // Apply some transforms and render an SVG path with the
        // // 'even-odd' fill rule
        // doc
        // .scale(0.6)
        // .translate(470, -380)
        // .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
        // .fill('red', 'even-odd')
        // .restore();

        // // Add some text with annotations
        // doc
        // .addPage()
        // .fillColor('blue')
        // .text('The link for GeeksforGeeks website', 100, 100)
            
        // .link(100, 100, 160, 27, 'https://www.geeksforgeeks.org/');

        // Finalize PDF file
        doc.end();

        //This PDF would be generated in "newFileUploads" folder and can be accessed on link example => http://localhost:8080/api/download/example.pdf
        return res.json({
            status:true,
            message:"PDF generated successfully",
            pdfLink:serverName+pdfName+'.pdf',
        });

    })

}


exports.getAssessmentXML = (req,res,next)=>{

    const assessmentNumber = req.body.assessmentNumber;

    Assessment.findAssessmentByAssessmentNumber(assessmentNumber)
    .then(assessmentData=>{
        if(!assessmentData)
        {
            return res.status(404).json({status:false, message:"No assessment with this number exists"});
        }
        assessmentData._id = assessmentData._id.toString();
        var obj1 = assessmentData;
        // console.log(obj1);
        // console.log(js2xmlparser.parse("assessment", obj1));
        fs.writeFile('./newFileUploads/assessment_'+assessmentNumber+'.xml', js2xmlparser.parse("assessment", obj1), err => {
          if (err) {
            console.error(err);
          }
          // file written successfully, now return the URL
          let xmlFileLink = serverName + 'assessment_' + assessmentNumber+'.xml';
          return res.json({status:true, message:"XML file generated",xmlFileLink:xmlFileLink});
        });
    })

}
