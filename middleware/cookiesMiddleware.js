const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

exports.cookieJwtAuth = expressAsyncHandler(async (req, res, next) => {

  
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user;
   // res.locals.user = user;

    next();
  } catch (err) {
    throw new Error(err.message)
  }
});