const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: __dirname + '/.env' })

const path = require('path');

var tokenFile = require('./services/verifyTokenFile');

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const candidateRoutes = require('./routes/candidate');
const notificationsRoutes = require('./routes/notifications');
const assessmentRoutes = require('./routes/assessment');


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/uploads',express.static('uploads'));


app.use(bodyParser.json());  //for application/json data


//enabling CORS package
app.use((req,res,next)=>{
    //setting header to all responses
    res.setHeader('Access-Control-Allow-Origin','*');  
                                           
                        //specifying which methods are allowed
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');

    next();  //so that request continues to next middleware
});

app.get('/',(req,res)=>{
    res.json({message:"deploy api"});
});


app.use('/api',userRoutes);
app.use('/api',adminRoutes);
app.use('/api',candidateRoutes);
app.use('/api',notificationsRoutes);
app.use('/api',assessmentRoutes);


// serve static folder (admin-panel)
app.use(express.static("dist/demo1"));

// show admin panel 
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "demo1", "index.html"));
});


// error handler
app.use((error, req, res, next) => {
    // console.log("Error " ,error);
    let { statusCode, msg } = error;
    statusCode = statusCode || 500;

    if (statusCode == 500) {
        console.log(error);
    }

    if (statusCode == 404 && !msg) msg = "not found";

    res.set('Status-Code', statusCode)
    if (req.header('Ignore-Status-Code') == "true") {
        statusCode = 200;
    }
    console.log(statusCode);
    res.status(statusCode).json({
        message: msg || "internal server error",
    });
});


let port = process.env.PORT || 80;
//establishing DB connection
mongoConnect(()=>{
     
    //listening to incoming request on this port
    app.listen(port);

});
