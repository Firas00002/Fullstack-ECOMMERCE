const config =require("config");

const db= config.get('db');

const mongoose =require("mongoose");

const connectDB = async()=>{

    try {
        await mongoose.connect(db);
        console.log('Database connected');
    } catch (error) {
        console.error(error);
    }
}
module.exports=connectDB;