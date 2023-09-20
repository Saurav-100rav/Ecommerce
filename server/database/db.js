const mongoose = require("mongoose");
require('dotenv').config(); 

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const MONGO_URL =`mongodb+srv://${dbUser}:${dbPassword}@cluster-freecodecamp.yticvao.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectDb = async()=>{
    try {
        await mongoose.connect(MONGO_URL,{ useNewUrlParser:true, useUnifiedTopology:true, }) 
        console.log("Databse connected successfully");
    } catch (error) {
        console.log("Error while connecting database...",error);
    }
} 

module.exports = connectDb;