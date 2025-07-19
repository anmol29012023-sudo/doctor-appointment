const mongoose = require('mongoose');
const colors = require('colors');

const connectdb = async() =>{
    try {
         await mongoose.connect(process.env.MONGODB_URL);
         console.log(`mongodb database connected ${mongoose.connection.host}`.bgGreen.red);
    } catch (error) {
        console.log(`mongodb issue ${error}`.bgRed.blue);
    }
};

module.exports=connectdb;
