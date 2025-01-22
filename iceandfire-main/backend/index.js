const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const mongoDB = require('./db');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './backend/.env' });

mongoDB();

app.use(cors({
    origin: "*" ,// Allow specif
    methods: ["POST", "GET"], // Allow specific methods
    credentials: true // Allow cookies with requests
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

// Sample route to send an email (for testing purposes)
app.post('/send-email', async (req, res) => {
    const { email, subject, text } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text
        });
        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

// Routes for your application
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/Items'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
