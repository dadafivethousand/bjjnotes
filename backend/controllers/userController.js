const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto'); // Node.js module for cryptography
const nodemailer = require('nodemailer');
 
const saltRounds = 10;


const jwtSecret = 'your_jwt_private_key'; // Use an environment variable in production

const sendEmail = (email, subject, text) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail', // For Gmail; for other services, you might need different settings
        auth: {
            user: "maximli_90@hotmail.com", // Email address in quotes
            pass: "Winter100" // Email password in quotes
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            reject(error); // Reject the promise with the error
        } else {
            console.log('Email sent: ' + info.response);
            resolve(info); // Resolve the promise with the info
        }
    });
  });
};



exports.register = async (req, res) => {
  try {
      const { email,username, password } = req.body;
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          return res.status(400).json({ message: 'Username already exists.' });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ message: 'Email already exists.' });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User created successfully.', userId: user._id });
  } catch (error) {
      console.error('Error in Register Endpoint: ', error);
      res.status(500).json({ message: 'Error registering new user.' });
  }
};



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      // Use res.json() for consistency and to ensure JSON format
      return res.status(400).json({ message: 'Invalid username or password.' });
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' }); // Consider adding an expiry to the token
    // Again, using res.json() for sending JSON response
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error logging in: ', error);
    // Using res.json() to send an error in JSON format
    res.status(500).json({ message: 'Error logging in.' });
  }
};


exports.sendResetEmail = async (req,res) => {
 
    const {email} = req.body;
    const user = await User.findOne({ email:email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
  }
      const resetToken = crypto.randomBytes(20).toString('hex')
      const resetTokenExpiry = Date.now() + 3600000;
 // Store token and expiry in user's account
      user.resetPasswordToken = resetToken
      user.resetPasswordExpires = resetTokenExpiry
      await user.save()
        try {
          res.json({ message: {resetToken: 
            resetToken, username: user.username} });
      } catch (error) {
        console.error('Error sending email: ', error);
        return res.status(500).json({ message: 'Failed to send password reset email.', error: error.message });
      }
  
}

exports.updatePassword = async (req,res) => {
  const {token, password} = req.body
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).send('Password reset token is invalid or has expired.');
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  user.password = hashedPassword; // Implement hashPassword to handle password hashing
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({message:'Password has been updated.'});
}

exports.changePassword = async (req, res) => {
  const {userId, currentPassword, newPassword} = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: "Error changing password" });
  }
};

