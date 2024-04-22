const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const signup = asyncHandler(async(req,res) =>{

    const { username, email, password } = req.body

    // check if there is an empty field

    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    //User.findOne({ email }): This is using Mongoose's findOne() method to search for a user in the database 
 
    const userExists = await User.findOne({ email });
    
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

 // hash the password 

 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.password, salt);
 

// User.create({ username, email, password }): This method is used to create a new document (user) in the MongoDB collection 

const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
});

     if(user){
         res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)

         }) }

    else{
      res.status(400);
      throw new Error("Invalid user data");
       }
        })

const login = asyncHandler( async (req,res) =>{
    
    const { email, password } = req.body;
    
    // check for user email 
    const user = await User.findOne({ email });
    
    if(user && (await bcrypt.compare(password, user.password))){

        res.cookie('token', generateToken(user._id), { httpOnly: false });
        
        res.json({
            _id: user.id,
            email : user.email,
            name: user.username,
            token: generateToken(user._id)
        })
       
     
    }
    else{
        res.status(400);
        throw new Error("Invalid credentials");
    }
})

// get user data from the token

const getUser = asyncHandler(async (req, res) => {
    // req.user come from the protect 
    const user = await User.findById(req.user.id);
   //const user = res.locals.user;
    
    res.status(200).json({
        status: 'success',
        data: {
          user,
        },
    
    
}) })

// generate a token

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};


module.exports = {signup , login ,getUser}