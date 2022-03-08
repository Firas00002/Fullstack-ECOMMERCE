const User = require("../models/User");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const config = require("config");
const bcryptjs = require("bcryptjs");
const secret = config.get("secret");
const JWT_Expire = config.get("JWT_Expire");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { fullName, email, password } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) res.status(409).json({ msg: "email already exist" });

  try {
    const newuser = new User({
      fullName,
      email,
      password,
      avatar: {
        public_id:myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    newuser.password = hash;
    await newuser.save();
    const payload = {
      id: newuser._id,
      fullName: newuser.fullName,
      email: newuser.email,
      role: newuser.role,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: newuser._id,
        fullName: newuser.fullName,
        email: newuser.email,
        role: newuser.role,
        avatar: newuser.avatar,
      },
    });
    // res.status(200).json(newuser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Bad credantials" });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Bad credantials" });
    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.logout= async(req,res)=>{

  

  try {
   res.status(201).json({msg:' deconnecté'})
    
  

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

// get user details

exports.getUserDetails = async (req, res) => {
  
  try {
   
    const user = await User.findById(req.user.id);

    res.status(200).json({ msg: "success",user});
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// update User profile

exports.updateProfile = async (req, res) => {
const newUserData = {
      fullName: req.body.fullName,
      email: req.body.email,
      
    };
  try {
    
  
    
    const user = await User.findByIdAndUpdate(req.user.id,{...req.body},{ new: true});
     
  
    res.status(200).json({
      success: true,
      newUserData
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
 
};

//get All users (admin)
exports.getAllUser = async(req,res) =>{


try {

  const users = await User.find()

  res.status(201).json({msg:'user Gotted',users})
  
  
} catch (error) {
  res.status(500).json({ msg: error.message });
}

};


//get single user (admin)
exports.getOneUser = async(req,res) =>{


  try {
  
    const user = await User.findById(req.params.id)
  
    res.status(201).json({msg:'user Gotted',user})
    
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
  
  };
// update User Role ---- (admin)
  exports.updateUserRole = async (req, res) => {

    try {
      const newUserData = {
        fullName: req.body.fullName,
        email: req.body.email,
        role:req.body.role
      };
    
      
      const user = await User.findByIdAndUpdate(req.params.id,{...req.body},{ new: true});
       
    
      res.status(200).json({
        success: true,
        newUserData
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
   
  };

  // delete User  ---- (admin)
  exports.deleteUser = async (req, res) => {

    try {
     
    
      
      const user = await User.findByIdAndDelete(req.params.id);
       
    
      res.status(200).json({msg:'successfly Deleted',user} );
        
       
      
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
   
  };

// exports.auth = (req, res) => {
//   res.send(req.user);
// };
