const Product = require("../models/product")
const slugify = require("slugify")
const shortid = require("shortid")
const Category = require("../models/category")


exports.createProduct = (req, res) => {
    // res.send("succes");

    const { name, price, description, category, quantity } = req.body;

    let productPicture;
    if (req.files.length >> 0) {
        productPicture = req.files.map(file => { return { img: file.filename } })
    }

    const product = new Product({
        name,
        price,
        description,
        productPicture,
        slug: slugify(name),
        createdBy: req.user._id,
        category,
        quantity
    });
    product.save((err, product) => {
        if (err) {
            res.status(400).json({ err })
        }
        if (product) {
            res.status(201).json({
                product
            })
        }
    })
}

exports.getProductBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug }).select("_id").exec((err, category) => {
        if (err) {

            res.status(400).json({ err })
        }
        if (category) {
            Product.find({ category: category._id }).exec((error, products) => {
                if (error) {

                    res.status(400).json({ err })
                }
                if (products.length > 0) {
                    res.status(200).json({
                        products, productByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price <= 10000 && product.price > 5000),
                            under15k: products.filter(product => product.price <= 15000 && product.price > 10000),
                            under20k: products.filter(product => product.price <= 20000 && product.price > 15000),
                            under30k: products.filter(product => product.price <= 30000 && product.price > 20000)
                        }
                    })
                }
                else {
                    res.status(400).json({ err: "products not exis" })
                }
            })
        }
        else {
            res.status(400).json({ err: "category not exist" });
        }
    })
    // res.status(200).json({slug})

}

exports.getRandomProduct= async(req,res)=>
{
    // res.send("random products");
    const productList=await Product.find({});
    RandomProductList=[]
    const length=productList.length;
    RandomNumbers=[];
    while(RandomNumbers.length<10 && RandomNumbers.length<length)
    {   
        const RandomNumber=Math.floor(Math.random() *length);
        if (RandomNumbers.includes(RandomNumber))
        {

        }
        else{
            RandomProductList.push(productList[RandomNumber]);
            RandomNumbers.push(RandomNumber);
        }


    }

    
    res.status(201).json({
        
        RandomProductList
        
    })
}



exports.getProductById=(req,res)=>
{
    const _id=req.body._id;
    // console.log(_id);
    // return true;
    Product.findOne({_id:_id},(err,product)=>
    {
        if(err)
        {
            res.status(201).json({err})
        }
        if(product)
        {
            res.status(201).json({product})
        }
        else
        {
            res.status(400).json({err:"error"})
        }
    
    })

}