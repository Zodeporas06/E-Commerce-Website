const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

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

exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) {

        return next(new ErrorHandler("User Not Found", 404));
    }

    //Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl =  `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
        
        await sendEmail({

            email: user.email,
            subject: "E-Commerce Website Password Recovery",
            message,
        });

        res.status(200).json({

            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
})

exports.resetPassword = catchAsyncErrors(async(req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({

        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user) {

        return next(new ErrorHandler("Token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {

        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({

        success: true,
        user,
    })
})