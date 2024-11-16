const Candidate = require('../models/candidate');

const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 
const ObjectId = mongodb.ObjectId;


exports.createNewCandidate = (req,res,next)=>{

    const candidateName = req.body.candidateName;
    const email = req.body.email;
    const phone = req.body.phone;
    const profileImgUrl = req.body.profileImgUrl;  
    const age = +req.body.age;
    const yearsOfExperience = +req.body.yearsOfExperience;
    const workExperience = req.body.workExperience;
    const cohort = req.body.cohort;
    const culinaryExperience = req.body.culinaryExperience;
    const shortBio = req.body.shortBio;
    const languages = req.body.languages;
    const skills = req.body.skills;
    const schoolGrade = req.body.schoolGrade;
    const location = req.body.location;
    const certificates = req.body.certificates;
    const resume = req.body.resume;         //URL
    const isHired = 0;

    Candidate.findCandidateByEmail(email)
    .then(candidateData=>{
        if(candidateData)
        {
            return res.status(409).json({status:false, message:"Candidate with this Email already exists"});
        }
        Candidate.findCandidateByPhone(phone)
        .then(candidateDataPhone=>{
            if(candidateDataPhone)
            {
                return res.status(409).json({status:false, message:"Candidate with this Phone already exists"});
            }

            const candidateObj = new Candidate(candidateName,email,phone,profileImgUrl,age,yearsOfExperience,workExperience,cohort,
                            culinaryExperience,shortBio,languages,skills,schoolGrade,location,certificates,resume,isHired);

            //saving in database
            return candidateObj.save()
            .then(resultData=>{
            return res.json({status:true,message:"Candidate Registered Successfully",candidate:resultData["ops"][0]});
            })
            .catch(err=>console.log(err));
        })
    })
  
}


exports.getAllCandidates = (req,res,next)=>{

    let skip = +req.query.skip;
    let limit = +req.query.limit;

    if(isNaN(skip))
    {
        skip = 0;
        limit = 0;
    }

    Candidate.fetchAllCandidates(skip,limit)
    .then(async candidatesData=>{
        let mappedCandidates = [];
        if(candidatesData.length==0)
        {
            return res.json({status:true, message:"All candidates returned",candidates:mappedCandidates});
        }
        let allCandidates = candidatesData.map(async c=>{
            let allRatings = await Rating.findCandidateRatingsByCandidateId(c._id.toString());
            console.log(allRatings.length);
            let totalRating = 0;
            allRatings.forEach(r=>{
                totalRating = totalRating + (+r.stars);
            });
            //Average rating
            c.rating = totalRating/(allRatings.length);
            mappedCandidates.push(c);
            if(mappedCandidates.length==candidatesData.length)
            {
                return res.json({status:true, message:"All candidates returned",candidates:mappedCandidates});
            }
        });
    })
}


exports.getAllCandidatesByName = (req,res,next)=>{

    const candidateName = req.body.candidateName.trim();

    Candidate.fetchAllCandidatesByName(candidateName)
    .then(candidatesData=>{
        // console.log(candidatesData);
        if(candidatesData.length==0)
        {
            return res.json({status:false, message:"No candidate with this name exists",candidates:[]});
        }
        return res.json({status:true, message:"Candidate(s) exists",candidates:candidatesData});
    })
}


exports.getSingleCandidateDetails = (req,res,next)=>{

    const candidateId = req.params.candidateId;

    Candidate.findCandidateByCandidateId(candidateId)
    .then(candidateData=>{
        if(!candidateData)
        {
            return res.status(404).json({status:false, message:"No Candidate with this ID exists"});
        }
        return res.json({status:true, message:"Candidate Exists", candidate:candidateData});
    })

}


exports.getAllCandidateSuggestions = (req,res,next)=>{
    
    let ageRange = req.body.ageRange;    //default 18-40
    let languages = req.body.languages;   //Array of strings
    let experienceRange = req.body.experienceRange;    //default 2-5
    let skills = req.body.skills;
    let grade = req.body.grade.trim().toLowerCase();

    skills = skills.map(s=>s.trim().toLowerCase());
    languages = languages.map(l=>l.trim().toLowerCase());

    //Setting to default if age range is null
    if(ageRange==null || ageRange=="")
    {
        ageRange = "18-40";
    }
    //splitting age range
    let startRange = +ageRange.split("-")[0];
    let endRange = +ageRange.split("-")[1];
    // console.log("Age Range : "+startRange+" "+endRange);

    //splitting experience range
    let startExpRange = +experienceRange.split("-")[0];
    let endExpRange = +experienceRange.split("-")[1];
    // console.log("Experience Range : "+startExpRange+" "+endExpRange);

    Candidate.fetchAllCandidates(0,0)
    .then(allCandidatesData=>{
        if(allCandidatesData.length==0)
        {
            return res.json({status:false, message:"No Candidates",candidates:allCandidatesData});
        }
        
        //**Filter candidates based on age**
        allCandidatesData = allCandidatesData.filter(i=>+i.age>=startRange && +i.age<=endRange); 
        //**Filter candidates based on years of experience**
        allCandidatesData = allCandidatesData.filter(i=>+i.yearsOfExperience>=startExpRange && +i.yearsOfExperience<=endExpRange)

        //**Filter candidates based on skills**
        allCandidatesData = allCandidatesData.filter(i=>{
            // console.log(i.skills);
            // const found = arr1.some(r=> arr2.includes(r));
            i.skills = i.skills.map(j=>j.trim().toLowerCase());
            const found = i.skills.some(r=> skills.includes(r));
            console.log(found);
            return found;
        });

        //**Filter candidates based on Skills**
        allCandidatesData = allCandidatesData.filter(i=>{
            // console.log(i.skills);
            // const found = arr1.some(r=> arr2.includes(r));
            i.skills = i.skills.map(j=>j.trim().toLowerCase());
            const found = i.skills.some(r=> skills.includes(r));
            // console.log(found);
            return found;
        });

        //**Filter candidates based on languages**
        allCandidatesData = allCandidatesData.filter(k=>{
            k.languages = k.languages.map(j=>j.trim().toLowerCase());
            const found = k.languages.some(r=> languages.includes(r));
            // console.log(found);
            return found;
        });
        
        //**Filter candidates based on grade**
        allCandidatesData = allCandidatesData.filter(i=>i.schoolGrade.trim().toLowerCase()==grade);

        // console.log(allCandidatesData);
        return res.json({status:true, message:"Candidates returned",candidates:allCandidatesData});
    });

}


function checkEmailAvailability(candidateId, email,_callBack)
{
    Candidate.findCandidateByCandidateId(candidateId)
    .then(candidateDoc=>{
        if(!candidateDoc)
        {
            _callBack(false,"No candidate with this ID exists");
            return;
        }
        Candidate.findCandidateByEmail(email)
        .then(candidateNew=>{
            if(!candidateNew)
            {
                _callBack(true,"New Email");
                return;
            }
            else if(candidateNew.email == candidateDoc.email)
            {
                _callBack(true,"Same Email");
                return;
            }
            else if(candidateNew.email != candidateDoc.email)
            {
                _callBack(false,"Email already used by another candidate");
                return;
            }
        })                
    })
}

function checkPhoneAvailability(candidateId, phone,_callBack)
{
    Candidate.findCandidateByCandidateId(candidateId)
    .then(candidateDoc=>{
        if(!candidateDoc)
        {
            _callBack(false,"No candidate with this ID exists");
            return;
        }
        Candidate.findCandidateByPhone(phone)
        .then(candidateNew=>{
            if(!candidateNew)
            {
                _callBack(true,"New Phone");
                return;
            }
            else if(candidateNew.phone == candidateDoc.phone)
            {
                _callBack(true,"Same Phone");
                return;
            }
            else if(candidateNew.phone != candidateDoc.phone)
            {
                _callBack(false,"Phone already used by another candidate");
                return;
            }
        })                
    })
}

exports.editSingleCandidate = (req,res,next)=>{

    const candidateId = req.params.candidateId;

    const candidateName = req.body.candidateName;
    const email = req.body.email;
    const phone = req.body.phone;
    const cohort = req.body.cohort;
    const age = +req.body.age;
    const location = req.body.location;
    const workExperience = req.body.workExperience;
    const yearsOfExperience = +req.body.yearsOfExperience;
    const schoolGrade = req.body.schoolGrade;
    const culinaryExperience = req.body.culinaryExperience;
    const shortBio = req.body.shortBio;
    const skills = req.body.skills;
    const languages = req.body.languages;
    const certificates = req.body.certificates;
    const profileImgUrl = req.body.profileImgUrl;
    const resume = req.body.resume;         //Updated URL

    try{
        Candidate.findCandidateByCandidateId(candidateId)
        .then(candidateData=>{
            if(!candidateData)
            {
                return res.status(404).json({status:false, message:"No candidate with this ID exists"});
            }
                                        //Using callback asynchronous approach
            checkEmailAvailability(candidateId, email, (valStatus,valMsg) => {
                if(!valStatus)
                {
                    return res.json({status:false, message:valMsg});
                }
                console.log(valStatus,valMsg);

                checkPhoneAvailability(candidateId, phone, (valStatus1,valMsg1) => {
                    if(!valStatus1)
                    {
                        return res.json({status:false, message:valMsg1});
                    }
                    console.log(valStatus1,valMsg1);

                    //Update the info
                    candidateData.candidateName = candidateName;
                    candidateData.email = email;
                    candidateData.phone = phone;
                    candidateData.cohort = cohort;
                    candidateData.age = age;
                    candidateData.location = location;
                    candidateData.workExperience = workExperience;
                    candidateData.yearsOfExperience = yearsOfExperience;
                    candidateData.schoolGrade = schoolGrade;
                    candidateData.culinaryExperience = culinaryExperience;
                    candidateData.shortBio = shortBio;
                    candidateData.skills = skills;
                    candidateData.languages = languages;
                    candidateData.certificates = certificates;
                    candidateData.profileImgUrl = profileImgUrl;
                    candidateData.resume = resume;

                    const db = getDb();

                    var o_id = new ObjectId(candidateId);
                    db.collection('candidates').updateOne({_id:o_id},{$set:candidateData})
                    .then(resultData=>{
                        res.json({status:true, message:'Candidate details updated Successfully',candidate:candidateData});
                    })
                    .catch(err=>console.log(err));
                });
            });
        })
    }
    catch(err){
        next(err);
    }
}


exports.hireSingleCandidate = (req,res,next)=>{

    try{
        const candidateId = req.params.candidateId;

        Candidate.findCandidateByCandidateId(candidateId)
        .then(candidateData=>{
            if(!candidateData)
            {
                return res.status(404).json({status:false, message:"No Candidate with this ID exists"});
            }
            candidateData.isHired = 1;

            const db = getDb();
            var o_id = new ObjectId(candidateId);
    
            db.collection('candidates').updateOne({_id:o_id},{$set:candidateData})
                .then(resultData=>{
                    res.json({status:true, message:'Candidate Hired Successfully'});
                })
                .catch(err=>console.log(err));
        })
    }
    catch(error){
        next(error);
    }    

}


exports.deleteSingleCandidate = (req,res,next)=>{

    try{
        const candidateId = req.params.candidateId;

        Candidate.findCandidateByCandidateId(candidateId)
        .then(candidateData=>{
            if(!candidateData)
            {
                return res.status(404).json({status:false, message:"No Candidate with this ID exists"});
            }
            const db = getDb();
            var o_id = new ObjectId(candidateId);
    
            db.collection('candidates').deleteOne({_id:o_id})
                .then(resultData=>{
                    res.json({status:true, message:'Candidate Deleted Successfully'});
                })
                .catch(err=>console.log(err));
        })
    }
    catch(error){
        next(error);
    }

}
