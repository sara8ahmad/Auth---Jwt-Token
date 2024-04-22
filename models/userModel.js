const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String , required: [true , 'Please add a user name'] },
    email: { type: String , required: [true , 'Please add an email'], unique: true, },
    password: { type: String , required: [true , 'Please add a password']},
    },
    {timestamps : true}
);

const User = mongoose.model('User' , UserSchema )

module.exports = User;


