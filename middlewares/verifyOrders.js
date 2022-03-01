const Orders = require("../models/Orders");








  const verifyOrders = async(req,res,next)=>{

    try {
        const order = await Orders.findById(req.params.id);
        if(!order) return res.status(404).json({msg:"Order not found with this Id"});
        
        
        else{
           
            next()
        }
            
                
            
        
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    
    }



  };


  module.exports=verifyOrders;