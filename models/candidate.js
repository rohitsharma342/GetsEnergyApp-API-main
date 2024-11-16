const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 

const ObjectId = mongodb.ObjectId;

class Candidate
{
    constructor(candidateName,email,phone,profileImgUrl,age,yearsOfExperience,workExperience,cohort,culinaryExperience,shortBio,languages,skills,schoolGrade,location,certificates,resume,isHired)
    {
        this.candidateName = candidateName;
        this.email = email;
        this.phone = phone;
        this.profileImgUrl = profileImgUrl;
        this.age = age;
        this.yearsOfExperience = yearsOfExperience;
        this.workExperience = workExperience;    //array of object like [{id:"",name:"",desc:""},....]
        this.cohort = cohort;   //kind of class
        this.culinaryExperience = culinaryExperience;        //array of object like [{id:"",name:""},....]
        this.shortBio = shortBio;
        this.languages = languages;    //Array of strings
        this.skills = skills;          //Array of strings
        this.schoolGrade = schoolGrade;
        this.location = location;
        this.certificates = certificates;       //Array of objects like [{id:'',name:'',desc:''},....]
        this.resume = resume;
        this.isHired = isHired;       //0-> No, 1-> Yes
        this.creationTimeStamp = new Date();
    }

    save()
    {
        const db = getDb();
        return db.collection('candidates').insertOne(this);                              
    }

    static findCandidateByCandidateId(cId)
    {
        var o_id = new ObjectId(cId);
        const db = getDb();

        return db.collection('candidates').findOne({_id:o_id})
            .then(candidateData=>{
                return candidateData;  
            })
            .catch(err=>console.log(err));
    }

    static findCandidateByEmail(email)
    {
        const db = getDb();

        return db.collection('candidates').findOne({email:email})
            .then(candidateData=>{
                return candidateData;
            })
            .catch(err=>console.log(err));
    }

    static findCandidateByPhone(phone)
    {
        const db = getDb();

        return db.collection('candidates').findOne({phone:phone})
            .then(candidateData=>{
                return candidateData;
            })
            .catch(err=>console.log(err));
    }

    static fetchAllCandidatesByName(cName)
    {
        const db = getDb();
        //To find if a substring exists in any of the candidate's name
        let regexVar = ".*"+cName+".*";
                                                                    //$options: "i" is added for case-insensitivity
        return db.collection('candidates').find({candidateName : { $regex : regexVar ,$options: "i" },isHired:0}).sort({creationTimeStamp:-1}).toArray()
            .then(candidateData=>{
                return candidateData;
            })
            .catch(err=>console.log(err));
    }

    static fetchAllCandidates(skipCount,limitCount)
    {
        const db = getDb();
        return db.collection('candidates').find({isHired:0}).sort({creationTimeStamp:-1}).skip(skipCount).limit(limitCount).toArray()
            .then(candidateData=>{
                return candidateData;
            })
            .catch(err=>console.log(err));
    }

}


module.exports = Candidate;
