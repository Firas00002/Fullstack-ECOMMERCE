const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    Public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role:{
      type:String,
      default:'user'
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});
module.exports = mongoose.model("User", userSchema);
