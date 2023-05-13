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

    //populate method id used to get related details of an attribute
    const order = await Order.findById(req.params.id).populate(

        "user",         //based on user id
        "name email"    //get name and email of user
    );

    if(!order) {

        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({

        success: true,
        order,
    });
})

//this  method requires authentication
exports.getMyOrders = catchAsyncErrors(async(req, res, next) => {

    const orders = await Order.find({user: req.user._id});

    res.status(200).json({

        success: true,
        orders,
    })
})

exports.getAllOrders = catchAsyncErrors(async(req, res, next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {

        totalAmount += order.totalPrice;
    })

    res.status(200).json({

        success: true,
        totalAmount,
        orders,
    });
})

//updating status of an order
exports.updateOrder = catchAsyncErrors(async(req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order) {

        return next(new ErrorHandler("Order Not Found", 404));
    }

    if(order.orderStatus === "Delivered") {

        return next(new ErrorHandler("Order is delivered", 400));
    }

    if(req.body.status === "Shipped") {

        order.orderItems.forEach(async(o) => {

            await updateStock(o.product, o.quantity);
        })
    }

    order.orderStatus = req.body.status;

    if(order.orderStatus === "Delivered") {

        order.deliveredAt = date.now();
    }

    await order.save({

        validateBeforeSave: false,
    });

    res.status(200).json({

        success: true,
    });

    async function updateStock(id, quantity) {

        const product = await Product.findById(id);

        product.stock -= quantity;

        await product.save({

            validateBeforeSave: false,
        });
    }
})

exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {

    const order = await Order.findById(req.params.id);

    if(!order) {

        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.remove();

    res.status(200).json({

        success: true,
    })
})