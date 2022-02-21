const Products = require("../models/Products");

  


 const verifyproduct = async(req,res,next)=>{

    try {
        const product = await Products.findById(req.params.id);
        if(!product) return res.status(500).json({msg:"product Not Found"});
        
        
        else{
           
            next()
        }
            
                
            
        
        
    } catch (error) {
        res.status(500).json({msg:error.message});
    
    }



  };


  module.exports=verifyproduct;