const Order = require("../models/order");
const express = require("express");
const Product = require("../models/product");
const { userMiddleware } = require("../common.middleware");
const user = require("../models/user");
// const { truncate } = require("node:fs");

exports.placeOrder = (req, res) => {
    const deliveryAddress = req.body.deliveryAddress;
    const price = req.body.price;
    const productId = req.body.productId
    const userId = req.user._id
    const paymentMode = req.body.paymentMode;
    // const myorder={
    //     user:userId,
    //     orders
    // }
    // console.log(req.body);
    if(deliveryAddress==="" || paymentMode==="")
    {
        return res.status(400).json("data not entered")
    }

    Order.findOne({ user: userId }, (err, order) => {
        if (err) {
            return res.status(400).json({ err });
        }
        if (order) {
            const myOrder = {
                deliveryAddress,
                productId,
                price,
                paymentMode
            };
            console.log(myOrder);
            Order.findOneAndUpdate({ user: userId }, {
                $push: { "orders": myOrder }
            }, { new: true }).select("orders").populate("orders.productId").exec((error, allOrder) => {
                return res.status(201).json({ allOrder })

            })
        }
        else {
            const myOrder = new Order({
                user: userId,
                orders: [{
                    deliveryAddress,
                    productId,
                    price,
                    paymentMode
                }]
            });
            console.log(myOrder)

            myOrder.save((err, allOrder) => {
                if (err) {
                    res.status(400).json({ err })
                }
                // console.log(allOrder);
                Product.populate(allOrder, { path: "orders.productId" }, (err, myOrder) => {
                    console.log(allOrder);
                    return res.status(201).json({ allOrder: allOrder.orders })
                })
            });

        }
    })




}


exports.cancleOrder = (req, res) => {
    const orderId = req.body.orderId;
    const userId = req.user._id;
    console.log(req.body);
    Order.findOneAndUpdate({ user: userId },
        { $pull: { orders: { _id: orderId } } },
        { new: true })
        .exec((err, allOrder) => {
            if (err) {
                res.status(400).json({ err })
            }
            console.log(allOrder);

            Product.populate(allOrder, { path: "orders.productId" }, (err, myOrder) => {
                console.log(allOrder);
                return res.status(201).json({ allOrder: allOrder.orders })
            })

            // res.status(201).json({allOrder:allOrder.orders});
        })
}




exports.fetchOrders = (req, res) => {
    Order.findOne({ user: req.user._id }).select("orders user").populate("orders.productId").exec((err, allOrder) => {
        if (err) {
            return res.status(400).json({ err });
        }
        if (allOrder) {
            return res.status(201).json({ allOrder: allOrder.orders,user:allOrder.user })
        }
    })

}


exports.fetchAllOrders = (req, res) => {
    // return res.send("called");
    Order.find({ }).select("orders user").populate("orders.productId").exec((err, allOrder) => {
        if (err) {
            return res.status(400).json({ err });
        }
        if (allOrder) {
            var orderListAllUser=[];
            var allUserList=[];
            allOrder.map(userOrder =>
                {
                    const allOrder=userOrder.orders.map(product=>
                        {
                            const order={
                            "status": product.status,
                            "paymentMode": product.paymentMode,
                            
                            "deliveryAddress": product.deliveryAddress,
                            "productId":product.productId,
                            "user":userOrder.user,
                            "_id":product._id
                            }
                            // console.log(order)
                           
                            return order;
                        })
                    console.log(allOrder)
                    orderListAllUser=[...orderListAllUser,...allOrder]


                })
            // console.log(orderListAllUser);
            return res.status(201).json({ allOrder: orderListAllUser })
        }
    })

}

exports.changeStatus = (req, res) => {
    const user = req.body.userId;
    const orderId = req.body.orderId;
    const status = req.body.status;
    // console.log("chnage order")
    console.log(req.body);

    Order.findOne({ user: user }).select("orders").exec((err, allOrder) => {
        if (err) {
            return res.status(400).json({ err });
        }
        if (allOrder) {
            // console.log(allOrder)
            const productIndex = allOrder.orders.findIndex((product, index) => {


                if (product._id == orderId) {
                    return true;
                }

            })

            console.log(productIndex);
           if(productIndex!=-1)
           {
            Order.findOneAndUpdate({ "user": user, "orders._id": orderId }, {
                $set: {
                    "orders.$": {
                        status: status,
                        productId: allOrder.orders[productIndex].productId,
                        paymentMode: allOrder.orders[productIndex].paymentMode,
                        deliveryAddress: allOrder.orders[productIndex].deliveryAddress,
                        price: allOrder.orders[productIndex].price
                    }
                }
            }, { new: true }).exec((error, allOrder) => {
                if (error) {

                    return res.status(400).json({ error })
                }
                else {

                    return res.status(201).json({ allOrder: allOrder })

                }
            })
        }
        else
        {
            return res.status(400).json("order not found ")
        }

        }
        else
        {
            return res.status(400).json({err})
        }

    })



    // Order.findOneAndUpdate( { user: user },{
    //     $set:{
    //         "orders.0.status":"hii"
    //     }
    // }, { new: true }).exec((error, _orders) => {
    //     console.log("inside")
    //     if (error) return res.status(400).json({ error })
    //     if (_orders) {
    //         return res.status(201).json({ allOrders:_orders  });
    //     }
    //     else{
    //         return res.status(400).json({ error })
    //     }
    // });

}