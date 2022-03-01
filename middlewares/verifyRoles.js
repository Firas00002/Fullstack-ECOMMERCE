



const roleCheck = (...roles) => (req, res, next) =>
!roles.includes(req.user.role)
  ? res.status(401).json(`Role: ${req.user.role} is not allowed to access this resouce `)
  : next();


  module.exports=roleCheck;


