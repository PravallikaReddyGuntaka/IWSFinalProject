const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {sendResetPasswordEmail} = require('../emailService')

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const user = await User.create({ firstName, lastName, email, password });
        res.status(201).json({ message: 'User registered successfully!'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const resetCode = crypto.randomBytes(4).toString('hex').toUpperCase();
      user.resetCode = resetCode;
      await sendResetPasswordEmail(email, resetCode);
      await user.save();
      console.log("reset code", resetCode);
  
  
      res.json({ message: 'Reset code sent. Check your email.' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };;


exports.resetPassword = async (req, res) => {
    try {
        const { email, resetCode, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetCode !== resetCode) {
            return res.status(400).json({ error: 'Invalid reset code or email' });
        }

        user.password = newPassword;
        user.resetCode = null;
        await user.save();

        res.json({ message: 'Password reset successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

