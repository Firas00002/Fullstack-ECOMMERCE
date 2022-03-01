const express =require ("express");
const connectDB = require("./config/connectDB");
const UserRoute = require('./routes/UserRoute');
const ProductRoute = require('./routes/ProductRoute');
const OrdersRoute = require('./routes/OrdersRoute');
const cloudinary =require("cloudinary")
const config =require("config");
let bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

const CLOUDINARY_NAME= config.get('CLOUDINARY_NAME');
const CLOUDINARY_API_KEY= config.get('CLOUDINARY_API_KEY');
const CLOUDINARY_API_SECRET= config.get('CLOUDINARY_API_SECRET');
const app =express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use("/user",UserRoute);
app.use("/allproducts",ProductRoute)
app.use("/allorders",OrdersRoute)

connectDB();

cloudinary.config({
    cloud_name : CLOUDINARY_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})


app.listen(5000,error=> error? console.error(error):console.log("server run on port 5000"))
