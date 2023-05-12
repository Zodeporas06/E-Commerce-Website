const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");
const ErrorHandler = require("../middleware/error.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({

        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({

        success: true,
        order,
    });
});

exports.getOrderDetails = catchAsyncErrors(async(req, res, next) => {

    const order = await Order.findById(req.params.id).populate(

        "user",
        "name email"
    );

    if(!order) {

        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({

        success: true,
        order,
    });
})
