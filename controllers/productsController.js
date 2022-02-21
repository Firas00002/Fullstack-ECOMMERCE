const Products = require("../models/Products")








// create Products ----Admin

    exports.addProducts = async (req, res) => {
        try {
          const newProducts = await new Products(req.body);
          newProducts.save();
          res.send(newProducts);
        } catch (error) {
          res.status(500).json({errors: error.message});
        }
      };



 //  Get allProducts --- User  
exports.getAllProducts =async(req,res)=>{

try {
    const AllProducts = await Products.find();
    res.send(AllProducts);
    
} catch (error) {
    res.status(500).json({errors: error.message});
}


    
};


// UPdate Products ----- Admin 


exports.editProducts = async (req, res) => {
    try {
      const editedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        {...req.body},
        {new: true}
      );
     
      res.send(editedProduct);
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  };


  // Delete Products ----- Admin 


exports.removeProducts = async (req, res) => {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params.id,);
     
      res.status(200).json({msg:`Name:${deletedProduct.name},Category:${deletedProduct.category}  was successfully deleted `})
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  };


  //get a product by its id
exports.ProductDetails = async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      res.send(product);
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  };


// Create New Review or Update the review
  exports.createProductReview = async (req, res) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  try {
    const product = await Products.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save();
  
    res.status(200).json({msg:'true'});
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
   
  };