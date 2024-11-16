const mongodb = require('mongodb');
const getDb = require('../util/database').getDB; 

const ObjectId = mongodb.ObjectId;

class User
{
    constructor(fullName,email,password,deviceId,deviceToken)
    {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.deviceId = deviceId;
        this.deviceToken = deviceToken;
        this.creationTimeStamp = new Date();
    }

    save()
    {
        const db = getDb();
        return db.collection('users').insertOne(this);                              
    }

    static findUserByEmail(email)
    {
        const db = getDb();
                            
        return db.collection('users').findOne({ email:email })
            .then(userData=>{
                return userData;  
            })
            .catch(err=>console.log(err));
    }

    static findUserByUserId(uId)
    {
        var o_id = new ObjectId(uId);
        const db = getDb();
                            
        return db.collection('users').findOne({_id:o_id})
            .then(userData=>{
                return userData;  
            })
            .catch(err=>console.log(err));
    }

    static fetchAllUsersByName(uName)
    {
        const db = getDb();
        //To find if a substring exists in any of the user's name
        let regexVar = ".*"+uName+".*";
                                                                    //$options: "i" is added for case-insensitivity
        return db.collection('users').find({fullName : { $regex : regexVar ,$options: "i" }}).sort({creationTimeStamp:-1}).toArray()
            .then(userData=>{
                return userData;
            })
            .catch(err=>console.log(err));
    }

    static fetchAllUsers(skipCount,limitCount)
    {
        const db = getDb();
        return db.collection('users').find().sort({creationTimeStamp:-1}).skip(skipCount).limit(limitCount).toArray()
            .then(userData=>{
                return userData;
            })
            .catch(err=>console.log(err));
    }

}


module.exports = User;
