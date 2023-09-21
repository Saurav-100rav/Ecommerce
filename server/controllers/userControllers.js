const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Register a User
const registerUser = async(req,res)=>{
    try {
        const {name,email,password,phone,avatar} = req.body;
        const oldUser =await User.findOne({email:email})
        if(oldUser)
        return res.status(409).json({   
            "Success" : false,
            "message" : "This Email address is already in use. Please use a different email."
        });
        else{
            const salt = await bcrypt.genSalt(10);
            const secure_password = await bcrypt.hash(password,salt);
                const newUser = new User({
                    name,   
                    email,
                    phone,
                    password:secure_password,
                    avatar
                })
            await newUser.save();
            console.log(`${newUser.name.split(" ")[0]} added successfully ....`);
            res.status(201).json({
                "Success" : true,
                newUser
            })
            }
    } catch (error) {
        console.log("Error while Registering User...",error.message);
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
    } 

    
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email}).select("+password");
        if(!user)
        return res.status(401).json({
            "Success" : false,
            "message" : "Invalid credentials. Please check your email or password."
        });
        else{
            const hashed_password = user.password;
            const isPaaswordMatched=await bcrypt.compare(password,hashed_password);
            if(isPaaswordMatched){
                console.log(`${user.name.split(" ")[0]} ,Login Successfull.`);

                    // Create a JWT token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: "7m" }
                    );
                // Decode the token to get the expiration timestamp
                const decodedToken = jwt.decode(token);
                const expirationTimestamp = decodedToken.exp;

// Convert the Unix epoch timestamp to a Date object
const expirationDate = new Date(expirationTimestamp * 1000); // Multiply by 1000 to convert to milliseconds

// Extract date and time components
const day = String(expirationDate.getDate()).padStart(2, '0');
const month = String(expirationDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const year = expirationDate.getFullYear();
const hours = String(expirationDate.getHours()).padStart(2, '0');
const minutes = String(expirationDate.getMinutes()).padStart(2, '0');
const seconds = String(expirationDate.getSeconds()).padStart(2, '0');

// Create the formatted date and time string
const formattedExpirationDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

console.log("Token expiration timestamp:", formattedExpirationDate);   
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({
                    "Success" : true,
                    user,
                    token
                })
                // new Date ( Date.now() + 15*60*1000 )
            }
            else{
                console.log("wrong behaviour found while logging...");
                res.status(401).json({
                    "Success" : false,
                    "message" : "Invalid credentials. Please check your email or password."
                }); 
            }
        }
    } catch (error) {
        console.log("Error while logging User...",error.message);
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}

const logout = async(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({
            "Success" : true,
            "message" : "Logged out Sucessfully..."
        });
    } catch (error) {
        res.send("error while logging out...",errror.message);
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}
    module.exports = {registerUser,loginUser,logout};