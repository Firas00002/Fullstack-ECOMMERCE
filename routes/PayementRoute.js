const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/payementcontroller");

const router = express.Router();


router.post("/payment/process", processPayment);

router.get("/stripeapikey", sendStripeApiKey);

module.exports = router;