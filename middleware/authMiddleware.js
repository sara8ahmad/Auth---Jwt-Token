const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require( '../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    
    let token;

    if(authHeader && authHeader.startsWith('Bearer') ){
        token = authHeader.split(' ')[1];
    } 

   else if (req.cookies.token) {
        token = req.cookies.token;
      }
          
          try{

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select('-password');
            req.user = user;
           // res.locals.user = user;

            next();
        }
        catch(error){
            res.status(401);
            throw new Error('Not authorized');
        }
    
    


})

module.exports = protect;