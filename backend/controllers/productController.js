const Product = require("../models/productModel.js");

//Create a Product
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

//Update a Product
exports.updateProducts = async(req, res, next) => {

    let product = await Product.findById(req.params.id);

    if(!product) {

        return res.status(500).json({

            success: false,
            message: "Product Not Found",
        })
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