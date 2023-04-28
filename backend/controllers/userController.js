const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");

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

    res.status(201).json({

        success: true,
        user,
    });
});