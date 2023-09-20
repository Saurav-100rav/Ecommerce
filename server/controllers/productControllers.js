const { isValidObjectId } = require("mongoose");
const Product = require("../models/productModel");

// To Create a New Product -- Admin

const createProduct = async(req,res)=>{
    try {
        const {name,description,category,stock,images,price} = req.body;
        const newProduct = new Product({
            name,
            description,
            category,
            stock,
            images,
            price
        })
        await newProduct.save();
        res.status(201).json({
            "Success" : true,
            newProduct
        })
    } catch (error) {
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}

// To get all products 

const getAllProducts = async(req,res)=>{
    try {
        console.log("query = ",req.query);
        const resultperPage = 2;
        const {name,category,stock,sort,select,minPrice,maxPrice,page} = req.query;
        const currentPage=Number(page) || 1;
        const skip = (currentPage-1) * resultperPage ;
        const queryObject = {};
        if(name) queryObject.name={  $regex: name, $options: "i" };
        if(category) queryObject.category={  $regex: category, $options: "i" };
        if(stock) queryObject.stock=stock;
        if(minPrice && maxPrice){
            queryObject.price = { $gte: minPrice,$lte: maxPrice }
        }
        if(minPrice && !maxPrice) queryObject.price = { $gte: minPrice };
        if(maxPrice && !minPrice) queryObject.price = { $lte: maxPrice };
        console.log("queryObject = ",queryObject);
        // const products = await Product.find(queryObject).sort("price -stock").select("-name");
        let apiString = Product.find(queryObject);
        
        if(sort){
            let sortfix = sort.split(",").join(" ");
            // console.log(sortfix,typeof(sortfix))
            apiString = apiString.sort(sortfix);
        }
        if(select){
            let selectfix = select.split(",").join(" ");
            apiString = apiString.select(selectfix);
        }

        // console.log(apiString)
        const products = await apiString.limit(resultperPage).skip(skip);
        res.status(200).json({
            "Success" : true,
             products
        })
    } catch (error) {
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}

// To update a product - admin

const updateProduct = async(req,res)=>{
    // console.log(req.params.id,typeof(req.params.id),isValidObjectId(req.params.id))
    try {
        let product = await Product.findById(req.params.id);
        // console.log(product)
    //  OUTPUT:   a single document is returned or null if not found
        if(!product)
        return res.status(404).json({
            "Success" : false,
            "message" : "Product not found"
        });
        else{
            // console.log("here");
            product = await Product.findByIdAndUpdate(req.params.id,req.body,{
                new : true,
                runValidators:true,
                useFindAndModify:false
            })
            // console.log("updated",product.name,"whoooo\n",product);
            res.status(200).json({
                "Success" : true, 
                product
            })
        }


    } catch (error) {
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}

// To delete a product - admin

const deleteProduct = async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        if(!product)
        return res.status(404).json({
            "Success" : false,
            "message" : "Product not found"
        });
        else{
            await Product.findByIdAndRemove(req.params.id);
            res.status(200).json({
                "Success" : true, 
                "message" : "product deleted successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}

// To Get a single product details 

const getProductDetails = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product)
        return res.status(404).json({
            "Success" : false,
            "message" : "Product not found"
        });

        res.status(200).json({
            "Success" : true, 
            product
        })


    } catch (error) {
        res.status(500).json({
            "Success" : false,
            "error": error.message
        })
    }
}
module.exports = {createProduct,getAllProducts,updateProduct,deleteProduct,getProductDetails}