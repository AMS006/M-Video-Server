const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
exports.registerUser = async(req,res) =>{
    try {
        const {name,email,password} = req.body;
        const userExists = await userModel.findOne({email})
        // Checking If User Already Exist With Entered Email
        if(userExists)
            return res.status(400).json({message:"User Already Exists"});

        const user = await userModel.create({name,email,password});

        const options = {
            expires : new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ),
            secure:true,
            maxAge:3600000*5,
            sameSite:'none',
            httpOnly:true
        }
        let token =  jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'5d'})
        return res.status(201).cookie("token",token,options).json({user})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
exports.loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user)
            return res.status(404).json({message:"Invalid Email or Password"});
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch)
            return res.status(400).json({message:"Invalid Email or Password"})

        let token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'5d'})
        const options = {
            expires : new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ),
            secure:true,
            maxAge:3600000*5,
            sameSite:'none',
            httpOnly:true
        }
        return res.status(201).cookie("token",token,options).json({user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.logoutUser = async(req,res) =>{
    try {
        return res.cookie('token',null).json({message:"Logout Successfull"})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
exports.getUserDetails = async(req,res) =>{
    try {
    const {token} = req.cookies
    const {_id} = await jwt.verify(token,process.env.SECRET_KEY)
    const user = await userModel.findById(_id);
        
      if(!user)
        return res.status(404).json({message:"No user found"});
      return res.status(200).json({user});
    } catch (error) {
      return res.status(500).json({success:false})
    }
}