const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
try {
     const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token,process.env.JWT_KEY ,(err,decode)=>{
    if (err) {
        return res.status(200).send({
            message:'Auth Failed',
            success:false
        })
    } else {
        //req.body.userID = decode.id,
        req.userId = decode.id; 

        if (req.body) {
          req.body.userID = decode.id;
        }

        next();
    }
  })
} catch (error) {
    console.error(error);
    return res.status(401).send({ success: false, message: 'Invalid Token' });
}
};

module.exports = authMiddleware;
