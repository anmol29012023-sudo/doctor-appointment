const mongoose= require('mongoose');

const userScehma= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }

});

const userModel = new mongoose.model('users', userScehma);

module.exports=userModel;