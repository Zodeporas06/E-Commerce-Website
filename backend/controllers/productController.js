const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

//Create a Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next)=> {

    const product = await Product.create(req.body);

    res.status(201).json({

        success: true,
        product,
    });
});

//Get a Product
exports.getAllProducts = catchAsyncErrors(async(req, res) => {

    const products = await Product.find();

    res.status(200).json({

        success: true,
        products,
    });
});

//Update a Product -- Admin
exports.updateProducts = catchAsyncErrors(async(req, res, next) => {

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
});

//Delete a Product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

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
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

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
});