const userModel = require('../models/Usermodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerController = async(req,res) => {
    try {
        const existingUser= await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'User Already Exist',success:false})
        }
        const password=req.body.password;
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        req.body.password=hashedPassword;
        const newUser=new userModel(req.body)
        await newUser.save();
        res.status(201).send({message:'Register Successfully',success:true});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: `Register Controller ${error.message}`})
    }
};
const loginController = async(req,res) => {
    try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: 'User Not Found', success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid Credentials', success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });
    res.status(200).send({
      message: 'Login Successful',
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Login Error: ${error.message}` });
  }
};
const authController = async(req,res)=>{
    try {
        const user= await userModel.findOne({_id:req.body.userID});
        if(!user){
            return res.status(200).send({
                message:"user not found",
                success:false,
            });
        }else{
            res.status(200).send({
                success:true,
                data: {
                    name :user.name,
                    email: user.email
                },
            });
        }

    } catch (error) {
        console.log(error),
        res.status(500).send({
            message:'auth error',
            success:false,
            error
        })
        
    }
};

module.exports ={registerController,loginController,authController};