const products = [
 {
   id:1,
   name:"Laptop",
   price:800
 },
 {
   id:2,
   name:"Keyboard",
   price:50
 }
];


const getProducts = (req,res)=>{

    res.json(products);

};
const getProductById = (req,res)=>{

    const productId = Number(req.params.id);


    const product = products.find(
        (item)=> item.id === productId
    );


    if(!product){

        return res.status(404).json({
            message:"Product not found"
        });

    }
    res.json(product);

};

//POST
const createProduct = (req,res)=>{

    const newProduct = req.body;


    products.push(newProduct);


    res.status(201).json({
        message:"Product created successfully",
        product:newProduct
    });

};

//PUT
const updateProduct = (req,res)=>{

    const productId = Number(req.params.id);


    const product = products.find(
        (item)=> item.id === productId
    );


    if(!product){

        return res.status(404).json({
            message:"Product not found"
        });

    }


    product.name = req.body.name;
    product.price = req.body.price;


    res.json({
        message:"Product updated successfully",
        product
    });

};

//Delete
const deleteProduct = (req,res)=>{

    const productId = Number(req.params.id);


    const productIndex = products.findIndex(
        (item)=> item.id === productId
    );


    if(productIndex === -1){

        return res.status(404).json({
            message:"Product not found"
        });

    }


    const deletedProduct = products.splice(productIndex,1);


    res.json({
        message:"Product deleted successfully",
        product:deletedProduct
    });

};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};