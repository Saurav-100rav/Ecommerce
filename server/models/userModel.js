const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please Enter Your Name"],
        maxLength : [30,"Name cannot exceed 30 characters"],
        minLength : [4,"Name should contain atleast 4 charcters"],
        trim : true
    },
    email : {
        type : String,
        required : [true,"Please Enter Your Email"],
        unique : true,
        validate : [validator.isEmail,"Please Enter a valid Email Address"]
    },
    password : {
        type : String,
        required : [true,"Please Enter Your Passowrd"],
        minLength : [8,"Password Must be atleast 8 charcters long"],
        select : false
    },
    avatar : {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        },
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

const User = new mongoose.model("User",userSchema);
module.exports = User;