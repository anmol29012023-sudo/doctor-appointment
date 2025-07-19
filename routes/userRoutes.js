const express=require('express');

const {
    loginController,
    registerController,
    authController,  
}= require("../controllers/userCtr");
const authMiddleware = require('../Middlewares/authMiddleware');
const { submitContactForm } = require('../controllers/contactController');

const router= express.Router();

router.post("/login", loginController);

router.post("/register", registerController);


router.post("/getUserData", authMiddleware, authController);

router.post('/send', submitContactForm);



module.exports= router;