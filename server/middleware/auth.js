const jwt = require('jsonwebtoken');
const User = require("../models/userModel")
const isAuthenticatedUser = async(req,res,next)=>{
    // Check if a JWT token is present in cookies
    const token = req.cookies.token;
    // console.log("Token = ",token);
    try {
        if (!token) 
        return res.status(401).json({
            "Success" : false,
            "message" : "Unauthorized Access. Please login first to use this service."
        });
        // Verify the JWT token
        const decodedData = jwt.verify(token, process.env.SECRET_KEY); // Replace with your actual secret key
        console.log("decoded Data = ",decodedData);

        // Attach the decoded user information to the request object
        // req.id = decoded.id;
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        res.status(401).json({
            "Success" : false,
            "message" : "Unauthorized Access. Please login first to use this service."
        });
    }
}

const authorizeRoles = (role)=>{
    return (req,res,next)=>{
        if(role !== req.user.role)
        return next(
         res.status(403).json({"message" : `Role : ${req.user.role} is not allowed to access this resource.`}) );
        else
         next();
        }
    
}


module.exports = {isAuthenticatedUser,authorizeRoles};