const express =require ("express");
const connectDB = require("./config/connectDB");
const user = require('./routes/user');
const ProductRoote = require('./routes/ProductRoute');

const app =express();
app.use(express.json());
app.use("/user",user);
app.use("/allproducts",ProductRoote)

connectDB();


app.listen(5000,error=> error? console.error(error):console.log("server run on port 5000"))
