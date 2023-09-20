const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please Enter Product Name"],
        trim : true
    },
    description : {
        type : String,
        required : [true,"Please Enter Product Description"]
    },
    price : {
        type : Number,
        required : [true,"Please Enter Product Price"],
        maxLength : [7,"Price cannot be more than 7 figure"]
    },
    rating : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,"Please Enter Product Category"]
    },
    stock : {
        type : Number,
        required : [true,"Please Enter quantity of stock"],
        maxLength : [4,"Stock quantity cannot be more than 4 figures"],
        default : 1
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

const Product = new mongoose.model("product",productSchema);
module.exports = Product;