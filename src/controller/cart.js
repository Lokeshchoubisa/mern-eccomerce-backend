const Cart = require("../models/cart");
const Product = require("../models/product");
const { getProductById } = require("./product");

exports.addItemToCart = (req, res) => {

    // return res.status(201).json({body:req.body});
    const cartItem = req.body.cartItems;
    Cart.findOne({ user: req.user._id }).exec((err, cart) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        if (cart) {
            // console.log("inside carrt");
            const productId = cartItem.productId;
            // console.log(productId);
            const item = cart.cartItems.find(c => c.productId == productId);
            console.log(item);
            let condition, update;
            // console.log(item)
            // return 0;
            if (item) {
                // console.log("inside items")
                // console.log(productId);
                // console.log(...item);
                console.log("product exists in cart");
                condition = { "user": req.user._id, "cartItems.productId": productId };
                update = {
                    $set: {
                        "cartItems.$": {
                            productId: cartItem.productId,
                            quantity: item.quantity + parseInt(cartItem.quantity ? cartItem.quantity : 1),
                            price: cartItem.price
                        }
                    }
                };


            }
            else {
                console.log("product not inside cart");
                condition = { user: req.user._id };
                update = {
                    $push: {
                        "cartItems": cartItem
                    }
                };

            }

            Cart.findOneAndUpdate(condition, update, { new: true }).exec((error, _cart) => {

                if (error) return res.status(400).json({ error })
                if (_cart) {
                    return res.status(201).json({ cart: _cart });
                }
            });

        }
        else {
            const cartItems = [];
            cartItems.push(cartItem);
            const cart = new Cart({
                cartItems,
                user: req.user._id
            });
            cart.save((err, cart) => {
                if (err) {
                    return res.status(400).json({
                        err
                    })
                }
                if (cart) {
                    return res.status(201).json({ cart })
                }
            });

        }


    })

}



exports.showCart = (req, res) => {
    
   Cart.findOne({user:req.user._id}).select("cartItems")
   .populate("cartItems.productId")
   .exec((err,cart)=>
   {
       if(err)
       {
           return res.status(400).json({err});
       }
       if(cart)
       {
        //    res.status(201).json()
        const productList=cart.cartItems.map(product=>
            {
                return product.productId
            })
        // console.log(cart);
        // console.log(productList);
        res.status(201).json({
            cartItems:productList
        })
       }
      
   })
}


exports.deleteCart=(req,res)=>
{
    const userId=req.user._id;
    const proId=req.body.productId;
    console.log(req.body);
    
    // console.log(cartId)
    // console.log(productId);

    Cart.findOneAndUpdate({ "user": req.user._id},
        { $pull: { cartItems: {productId:proId} } }
    ,{new:true}).exec((err,cart)=>
    {
        console.log(cart);
    });

    return res.json({s:"success"})

}