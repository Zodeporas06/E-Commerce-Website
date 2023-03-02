const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");

//Create a Product -- Admin
exports.createProduct = async (req, res, next)=> {

    const product = await Product.create(req.body);

    res.status(201).json({

        success: true,
        product,
    });
};

//Get a Product
exports.getAllProducts = async(req, res) => {

    const products = await Product.find();

    res.status(200).json({

        success: true,
        products,
    });
};

//Update a Product -- Admin
exports.updateProducts = async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {

        return next(new ErrorHandler("Product Not Found", 404));
    }
    else {

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {

            new: true,
            runValidators: true,
            useFindandModify: false,
        })

        return res.status(200).json({

            success: true,
            product,
        })
    }
}

//Delete a Product -- Admin
exports.deleteProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {

        return next(new ErrorHandler("Product Not Found", 404));
    }
    else {

        await product.remove();

        return res.status(200).json({

            success: true,
            message: "Product Deleted Successfully",
        })
    }
}

//Get Product Details
exports.getProductDetails = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {

        return next(new ErrorHandler("Product Not Found", 404));
    }
    else {

        return res.status(200).json({

            success: true,
            product,
        })
    }
}