const nodemailer = require('nodemailer');

// Create and configure the transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'testinvennico@gmail.com', // Your Gmail address
    pass: 'edztmbnuqbiauacd', // Your Gmail password or app-specific password
  },
});

// Export the transporter as a named export
module.exports = { transporter };