const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 

const ObjectId = mongodb.ObjectId;

class Assessment
{
    constructor(userId,customerName,customerEmail,customerPhone,address,city,province,postalCode,yearBuilt,assessmentNumber,apNumber,vermInsulation,
        programmableThermostat,stoveType,dryerType,indoorTemp,indoorCF,outdoorTemp,outdoorCF,atypicalLoads,lowFlowToiletCounts,totalToilets,
        exhaustFansCount,rangeHoodsCount,houseFrontFacing,note,assessmentType,houseSketches,ceilingDetails,heatingSystemDetails,heatingSystemDetails2,hotWaterSystemDetails,
        ventilationSystemDetails,floorDetails,tightnessTestDetails,leakageTestDetails,upgrades,recommendations,otherNote,brouchers,
        homeOwnerNotice,advisorCheckList,xmlLink,isSubmitted)
    {
        this.userId = userId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.address = address;
        this.city = city;
        this.province = province;
        this.postalCode = postalCode;
        this.yearBuilt = yearBuilt;
        this.assessmentNumber = assessmentNumber;
        this.apNumber = apNumber;
        this.vermInsulation = vermInsulation;                    // 0-> No, 1-> Yes, 2-> Unknown
        this.programmableThermostat = programmableThermostat;    // 0-> No, 1-> Yes
        this.stoveType = stoveType;                              // 0-> Electric, 1-> Natural Gas, 2-> Propane
        this.dryerType = dryerType;                              // 0-> Electric, 1-> Natural Gas, 2-> Propane
        this.indoorTemp = indoorTemp;
        this.indoorCF = indoorCF;
        this.outdoorTemp = outdoorTemp;
        this.outdoorCF = outdoorCF;
        this.atypicalLoads = atypicalLoads;                      // Array of strings like ["De-icing cables","Heated Garage",....]
        this.lowFlowToiletCounts = lowFlowToiletCounts;
        this.totalToilets = totalToilets;
        this.exhaustFansCount = exhaustFansCount;
        this.rangeHoodsCount = rangeHoodsCount;
        this.houseFrontFacing = houseFrontFacing;
        this.note = note;
        this.assessmentType = assessmentType;                   // 0-> Pre, 1-> Post
        this.houseSketches = houseSketches;                     // Array of objects like [{name:"",sketchUrl:""},{....},....]
        this.ceilingDetails = ceilingDetails;                   // Array of objects
        this.heatingSystemDetails = heatingSystemDetails;       // Array of objects
        this.heatingSystemDetails2 = heatingSystemDetails2;     // Array of objects
        this.hotWaterSystemDetails = hotWaterSystemDetails;     // Array of objects
        this.ventilationSystemDetails = ventilationSystemDetails;        // Array of objects
        this.floorDetails = floorDetails;                       // Array of objects
        this.tightnessTestDetails = tightnessTestDetails;       // Array of objects
        this.leakageTestDetails = leakageTestDetails;           // Array of objects
        this.upgrades = upgrades;                               // Array of objects
        this.recommendations = recommendations;                 // Array of Strings
        this.otherNote = otherNote;
        this.brouchers = brouchers;                             // Array of strings
        this.homeOwnerNotice = homeOwnerNotice;
        this.advisorCheckList = advisorCheckList;
        this.xmlLink = xmlLink;
        this.isSubmitted = isSubmitted;                         // 0-> No, 1-> Yes
        this.creationTimeStamp = new Date();
    }

    save()
    {
        const db = getDb();
        return db.collection('assessments').insertOne(this);                              
    }

    static findAssessmentById(aId)
    {
        var o_id = new ObjectId(aId);
        const db = getDb();

        return db.collection('assessments').findOne({_id:o_id})
            .then(assessmentData=>{
                return assessmentData;  
            })
            .catch(err=>console.log(err));
    }

    static findAssessmentByAssessmentNumber(aNo)
    {
        const db = getDb();

        return db.collection('assessments').findOne({assessmentNumber:aNo})
            .then(assessmentData=>{
                return assessmentData;  
            })
            .catch(err=>console.log(err));
    }

    static findAssessmentByApNumber(apNo)
    {
        const db = getDb();

        return db.collection('assessments').findOne({apNumber:apNo})
            .then(assessmentData=>{
                return assessmentData;  
            })
            .catch(err=>console.log(err));
    }

    static fetchAllAssessmentsByAssessmentNumber(uName)
    {
        const db = getDb();
        //To find if a substring exists in any of the assessmentNumber
        let regexVar = ".*"+uName+".*";
                                                                    //$options: "i" is added for case-insensitivity
        return db.collection('assessments').find({assessmentNumber : { $regex : regexVar ,$options: "i" }}).sort({creationTimeStamp:-1}).toArray()
            .then(assessmentData=>{
                return assessmentData;
            })
            .catch(err=>console.log(err));
    }

    static fetchAllAssessmentsByUser(skipCount,limitCount,uId,aType)
    {
        if(aType==-1)
        {
            const db = getDb();
            return db.collection('assessments').find({userId:uId}).sort({creationTimeStamp:-1}).skip(skipCount).limit(limitCount).toArray()
                .then(assessmentData=>{
                    return assessmentData;
                })
                .catch(err=>console.log(err));
        }
        else{
            const db = getDb();
            return db.collection('assessments').find({userId:uId,assessmentType:aType}).sort({creationTimeStamp:-1}).skip(skipCount).limit(limitCount).toArray()
                .then(assessmentData=>{
                    return assessmentData;
                })
                .catch(err=>console.log(err));
        }
    }

    static fetchAllAssessments(skipCount,limitCount,aType)
    {
        const db = getDb();
        return db.collection('assessments').find({assessmentType:aType}).sort({creationTimeStamp:-1}).skip(skipCount).limit(limitCount).toArray()
            .then(assessmentData=>{
                return assessmentData;
            })
            .catch(err=>console.log(err));
    }

}


module.exports = Assessment;
