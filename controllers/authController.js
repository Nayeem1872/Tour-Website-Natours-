const jwt = require ('jsonwebtoken');
const User =require('./../models/userModel');
const AppError = require ('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
exports.signup = catchAsync(async (req, res, next) =>{
    const newUser = await User.create(req.body);
    
    const token = jwt.sign({id:newUser._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(201).json({
        status:'success',
        data:{
            user: newUser
        }
    });
}); 

exports.login = (req,res, next)=>{
    const{email, password} = req.body;
    if(!email ||!password){
        next(new AppError)
    }


}