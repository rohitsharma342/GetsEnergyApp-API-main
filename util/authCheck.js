const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorHandler");

const isUser = async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    // if token is missing, throw error
    if (!token) throw new ErrorHandler(401, "unauthorized");

    token = token.split(" ")[1]; // remove "Bearer"
    // console.log("TOKEN:",token);

    // verify, decode token
    jwt.verify(token, 'myAppSecretKey', (err, payload) => {
      // console.log("Error : ",err);
      // if token is invalid, throw error
      if (err) throw new ErrorHandler(401, "unauthorized");
      // else continue with populating user
      else if (payload.user == undefined || payload.user._id == undefined) {
        console.log("Payload error");
        throw new ErrorHandler(401, "unauthorized");
      } 
      else {
        // console.log("Payload : ",payload);
        // req.user = {
        //   _id: payload._id,
        //   name: payload.name,
        //   email: payload.email,
        //   userType: payload.userType,
        // };        
        next();
      }
    });
  } catch (error) {
    // console.log("Error : ",error);
    next(new ErrorHandler(401, "unauthorized"));
  }
};

const isAdmin = async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    // if token is missing, throw error
    if (!token) throw new ErrorHandler(401, "unauthorized");

    token = token.split(" ")[1]; // remove "Bearer"
    // console.log("TOKEN:",token);

    // verify, decode token
    jwt.verify(token, 'myAppSecretKey', (err, payload) => {
      // if token is invalid, throw error
      if (err) throw new ErrorHandler(401, "unauthorized");
      // else continue with populating user
      else if (payload.admin == undefined || payload.admin.adminId == undefined) {
        console.log("isAdmin Payload error");
        throw new ErrorHandler(401, "unauthorized");
      } 
      else {
        next();
      }
    });
  } catch (error) {
    // console.log("Error : ",error);
    next(new ErrorHandler(401, "unauthorized"));
  }
};

const isBoth = async (req, res, next) => {
  let token = req.headers.authorization;

  try {
    // if token is missing, throw error
    if (!token) throw new ErrorHandler(401, "unauthorized");

    token = token.split(" ")[1]; // remove "Bearer"
    // console.log("TOKEN:",token);

    // verify, decode token
    jwt.verify(token, 'myAppSecretKey', (err, payload) => {
      // if token is invalid, throw error
      if (err) throw new ErrorHandler(401, "unauthorized");
      // else continue with populating user
      else if (payload.admin == undefined && payload.user == undefined) {
        console.log("Payload error");
        throw new ErrorHandler(401, "unauthorized");
      } 
      else {
        next();
      }
    });
  } catch (error) {
    // console.log("Error : ",error);
    next(new ErrorHandler(401, "unauthorized"));
  }
};


module.exports = { isUser, isAdmin ,isBoth};
