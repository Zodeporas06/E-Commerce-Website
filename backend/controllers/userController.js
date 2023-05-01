const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");

exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({

        name,
        email,
        password,

        avatar: {

            public_id: "This id is public",
            url: "This is url"
        },
    });

    sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async(req, res, next) => {

    const {email, password} = req.body;

    if(!email || !password) {

        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {

        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched) {

        return next(new ErrorHandler("Invalid Email or Password", 401))
    }

    sendToken(user, 200, res);
})

exports.logoutUser = catchAsyncErrors(async(req, res, next) => {

    res.cookie("token", null, {

        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(200).json({

        success: true,
        message: "Logged Out",
    })
})