const express = require('express');
const router = express.Router();
const Users = require('../modals/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const orders=require('../modals/Order');
const crypto = require('crypto');
const twilio = require('twilio');
const mongoose = require('mongoose');

const jwtSecret =process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

let otpStorageEmail = {}; // Temporary storage for email OTPs
let otpStoragePhone = {}; // Temporary storage for phone OTPs

// User registration
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    body('phone').optional().isLength({ min: 10 }) // Make 'phone' optional, but require at least 10 characters if provided
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await Users.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
            phone: req.body.phone // Ensure this field exists in the database schema
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: 'User creation failed' });
    }
});


// User login
router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await Users.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct email credentials" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        const data = {
            user: {
                id: userData._id
            }
        };

        // Set token expiration time (e.g., 30 minutes)
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: '30m' });

        // Include the expiration time in the response
        const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutes from now

        return res.json({ success: true, authToken: authToken, expirationTime: expirationTime, name:userData.name });
    } catch (error) {
        console.error("Error logging in:", error);
        res.json({ success: false });
    }
});

// Change password
router.post("/changePassword", async (req, res) => {
    const { email, oldpassword, newpassword } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Incorrect old password" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newpassword, salt);
        await user.save();

        res.json({ success: true });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Send OTP via email
router.post('/sendOtp', async (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiration = Date.now() + 5 * 60 * 1000;
    otpStorageEmail[email] = { otp, otpExpiration };

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        });

        res.json({ success: true, message: 'OTP sent.' });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
});

// Verify email OTP
router.post('/verifyOtp', async (req, res) => {
    const { email, otp } = req.body;
    const storedOtpData = otpStorageEmail[email];

    if (storedOtpData && storedOtpData.otp === otp && Date.now() < storedOtpData.otpExpiration) {
        delete otpStorageEmail[email]; // Clear OTP after verification
        res.json({ success: true, message: 'Email verified successfully.' });
    } else {
        res.json({ success: false, message: 'Invalid or expired OTP.' });
    }
});

// Twilio configuration
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; // Replace with your Twilio Account SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
const twilioClient = twilio(twilioAccountSid, twilioAuthToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Your Twilio phone number


router.post('/twilio_sendotp', async (req, res) => {
  let { phone } = req.body;

  // Normalize phone number to include +91 if missing
  if (!phone.startsWith('+91')) {
      phone = '+91' + phone;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiration = Date.now() + 5 * 60 * 1000;
  otpStoragePhone[phone] = { otp, otpExpiration };

  try {
      await twilioClient.messages.create({
          body: `Your OTP is: ${otp}`,
          from: twilioPhoneNumber,
          to: phone
      });

      res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
      console.error('Error sending OTP via Twilio:', error.message);
      return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
});

// Verify phone OTP
router.post('/twilio_verifyotp', (req, res) => {
  let { otp, phone } = req.body;

  // Normalize phone number to include +91 if missing
  if (!phone.startsWith('+91')) {
      phone = '+91' + phone;
  }

  const storedOtpData = otpStoragePhone[phone];

  if (storedOtpData && storedOtpData.otp === otp && Date.now() < storedOtpData.otpExpiration) {
      delete otpStoragePhone[phone]; // Clear OTP after verification
      return res.json({ success: true, message: 'Phone number verified successfully.' });
  } else {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }
});

//updating the order_details into the table
router.post('/orders',async(req,res)=>{
    const {name,email,transactionId,totalAmount,items,status}=req.body;

    if(!name||!email||!transactionId||!totalAmount||!items||!status){
        return res.status(400).json({message:'Missing requried fields'});
    }
    
    const orderId = new mongoose.Types.ObjectId();

    try{
        const newOrder=new orders({
            orderId,
            name,
            email,
            transactionId,
            totalAmount,
            items,
            status, 
        });
        await newOrder.save();
        res.status(201).json({message:'Order details saved successfully',order:newOrder});
    }catch(err)
    {
        console.error('Error saving order:',err);
        res.status(500).json({message:'Error saving order details'});
    }
});



module.exports = router;

