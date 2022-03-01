const User = require("../models/User");

const verifyUser = async(req,res,next)=>{

    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({msg:"User not found with this Id"});
        
        
        else{
           
            next()
        }
            
                
            
        
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    
    }



  };


  module.exports=verifyUser;