const User = require("../models/User");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const config = require("config");
const bcryptjs = require("bcryptjs");
const secret = config.get("secret");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const existantUser = await User.findOne({ email });
  if (existantUser) res.status(409).json({ msg: "email already exist" });

  try {
    const newuser = new User({
      fullName,
      email,
      password,
    });

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    newuser.password = hash;
    await newuser.save();
    const payload = {
      id: newuser._id,
      fullName: newuser.fullName,
      email: newuser.email,
    };
    let token = jwt.sign(payload, secret);
    res.send({
      token,
      user: {
        id: newuser._id,
        fullName: newuser.fullName,
        email: newuser.email,
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
  if (!user) return res.status(404).json({ msg: "Bad credantials" });
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) return res.status(404).json({ msg: "Bad credantials" });
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      };
      let token = jwt.sign(payload, secret);
      res.send({
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
};


exports.auth =(req,res)=>{
    res.send(req.user)
};