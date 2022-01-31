

const {check, validationResult}=require('express-validator')



exports.registerRules=()=>[
    check('fullName','this feild is required').notEmpty(),
    check('email','this feild is required').notEmpty(),
    check('email','this feild should be a valid email').isEmail(),
    check('password','password at least 6 characters').isLength({min:6})
];



exports.loginRules=()=>[
    check('email','this feild is required').notEmpty(),
    check('email','this feild should be a valid email').isEmail(),
    check('password','password at least 6 characters').isLength({min:6})
];


exports. validator =(req,res,next)=> {
    const errors =validationResult(req);
    errors.isEmpty()? next():res.status(406).json({errors:errors.array()})

};