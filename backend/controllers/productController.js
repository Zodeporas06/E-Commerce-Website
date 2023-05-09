const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apifeatures.js");

//Create a Product -- Admin
exports.createProduct = catchAsyncErrors(async(req, res, next)=> {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({

        success: true,
        product,
    });
});

//Get all Products
exports.getAllProducts = catchAsyncErrors(async(req, res) => {

    const resultPerPage = 6;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products = await apiFeatures.query;

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
            productCount,
        })
    }
});

exports.createProductReview = catchAsyncErrors(async(req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {

        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(

        rev=> rev.user.toString() === req.user._id.toString()
    );

    if(isReviewed) {

        product.reviews.forEach(rev=> {

            if(rev.user.toString() === req.user._id.toString()) {

                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else {

        product.reviews.push(review);
    }

    let sumOfratings = 0;

    product.reviews.forEach(rev=> {

        sumOfratings += rev.rating
    })

    product.ratings = sumOfratings/product.reviews.length;

    product.numOfReviews = product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({

        success: true,
        product,
    })
})