



const roleCheck = (...roles) => (req, res, next) =>
!roles.includes(req.user.role)
  ? res.status(401).json('Forbidden')
  : next();


  module.exports=roleCheck;


