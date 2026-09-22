const {Product} = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//put
exports.updateProduct = async (req, res) => {

    try {

        const productId = req.params.id;

        const product = await Product.findByPk(productId);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        product.name = req.body.name;
        product.price = req.body.price;


        await product.save();


        res.json({
            message: "Product updated successfully",
            product
        });


    } catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};

//Delete
exports.deleteProduct = async (req, res) => {

    try {

        const productId = req.params.id;


        const product = await Product.findByPk(productId);


        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        await product.destroy();


        res.json({
            message: "Product deleted successfully"
        });


    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};