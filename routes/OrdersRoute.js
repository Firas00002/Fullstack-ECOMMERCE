const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersContoroller");
const verifyAuth = require("../middlewares/verifyAuth");
const verifyOrders = require("../middlewares/verifyOrders");
const roleCheck = require("../middlewares/verifyRoles");

const router = express.Router();

router.post("/order/new",verifyAuth,newOrder);

router.get("/order/:id", verifyAuth, verifyOrders, getSingleOrder);

router.get("/orders/me", verifyAuth, myOrders);

router.get("/admin/orders", verifyAuth, roleCheck("admin"), getAllOrders);

router.put(
  "/admin/order/:id",
  verifyAuth,
  verifyOrders,
  roleCheck("admin"),
  updateOrder
);

router.delete(
  "/admin/order/:id",
  verifyAuth,
  verifyOrders,
  roleCheck("admin"),
  deleteOrder
);

module.exports = router;
