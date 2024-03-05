const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true }, 
    password: String,
    email: { type: String, unique: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);
