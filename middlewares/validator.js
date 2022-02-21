

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

exports.createproductsRules=()=>[
    check('name','Please Enter Product Name').notEmpty(),
    check('description','Please Enter Product Description').notEmpty(),
    check('price','Please Enter Product Price').isLength({max:8},'Price cannot exceed 8 caracters').notEmpty(),
    check('stock','Please Enter Product Price').isLength({max:4},'Stock cannot exceed 4 caracters'),
    
];



exports. validator =(req,res,next)=> {
    const errors =validationResult(req);
    errors.isEmpty()? next():res.status(406).json({errors:errors.array()})

};