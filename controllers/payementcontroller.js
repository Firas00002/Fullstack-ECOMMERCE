
const config =require("config");

const STRIPE_SECRET_KEY= config.get('STRIPE_SECRET_KEY');
const STRIPE_API_KEY= config.get('STRIPE_API_KEY');


const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
  
};

exports.sendStripeApiKey = async (req, res) => {
  res.status(200).json({ stripeApiKey:STRIPE_API_KEY });
};
