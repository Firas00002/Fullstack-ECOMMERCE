const Products = require("../models/Products");
const ApiFeatures = require("../utils/apiFuture");








// create Products ----Admin

    exports.addProducts = async (req, res) => {
          req.body.user=req.user.id

      
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

  const resultPerPage = 8;
  const productsCount = await Products.countDocuments();

  
try {
    const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter();

  let product = await apiFeature.query;

  let filteredProductsCount = product.length;

  apiFeature.pagination(resultPerPage);

  product = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    product,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
} catch (error) {
    res.status(500).json({errors: error.message});
}


    
};


// UPdate Products ----- Admin 


exports.editProducts = async (req, res) => {
  ApiFeatures=ApiFeatures
  
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
      name: req.user.fullName,
      rating: Number(rating),
      comment,
    };
  try {
    const product= await Products.findById(productId);
  
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

  // Get All Reviews of a product
exports.getProductReviews = async (req, res) => {

  try {
    const product = await Products.findById(req.query.id);

  

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
  
};

// Delete Review
exports.deleteReview = async (req, res) => {

  try {
    const product = await Products.findById(req.query.productId);

  

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      
    }
  );

  res.status(200).json({
    success: true,
  });


  } catch (error) {
    res.status(500).json({errors: error.message});
  }
}