const express = require("express");
const app = express();
 
const cors = require("cors");
app.use(cors());

// Add the cookie-parser middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//basically parse incoming Request Object as a JSON Object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connect_database = require("./database/db");
connect_database();

const productRoutes = require("./routes/productRoutes");
app.use("/api/v1",productRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1",userRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome on E-commerce App.....");
})

const port = 5000||process.env.PORT;

const start_server = ()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is running on http://localhost:${port}.`);
        })
    } catch (error) {
        console.log("Error while starting Backend server....",error);
    }
}
start_server();
