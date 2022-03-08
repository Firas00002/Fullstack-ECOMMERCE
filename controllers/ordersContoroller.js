const Orders = require("../models/Orders");
const Products = require("../models/Products");

//create new order

exports.newOrder = async (req, res) => {


  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    const order = await new Orders({
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
      order.save()
    res.status(201).json({msg:"success",order,});
    
      
      
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// get Single Order
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id).populate(
      "user",
      "fullName email"
    );

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// get logged in user  Orders
exports.myOrders = async (req, res) => {
  try {
    const orders = await Orders.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// get all Orders -- Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// update Order Status -- Admin
exports.updateOrder = async (req, res, next) => {
  const order = await Orders.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next("You have already delivered this order", 400);
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();
  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Products.findById(id);

  product.Stock -= quantity;

  await product.save();
}

// delete Order -- Admin
exports.deleteOrder = async (req, res) => {
  const order = await Orders.findByIdAndDelete(req.params.id);

  

  res.status(200).json({
    success: true,
  });
};
