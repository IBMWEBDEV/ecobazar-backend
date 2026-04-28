 require('dotenv').config()
 const { config } = require('dotenv')
 const express = require("express")
 const cors = require('cors')
 const User = require('./model/userSchema')
 const nodemailer = require("nodemailer");
 const jwt = require('jsonwebtoken');
 const dbConnection = require('./config/dbConnection')
 const app = express()
 app.use(express.json())
 app.use(cors())


 dbConnection()

 app.post("/registration", async(req, res) => {

     const { email, password, confirmPassword, terms } = req.body

     const existingUser = await User.findOne({ email: email })
     if (existingUser) {
         res.send({ message: "Email already exists. Please use another email", })
     }

     if (!terms) {
         return res.send("You must accept the terms and conditions.");
     }

     if (!email || !password || !confirmPassword) {
         return res.send({ message: "All fields are required." });
     }

     if (password !== confirmPassword) {
         res.send({ message: "Passwords do not match." });
     }

     let user = new User({
         email: email,
         password: password,
         terms: terms
     })
     user.save()

     let token = jwt.sign({
             id: user._id,
             email: user.email
         },
         process.env.ACCESS_TOKEN_SECRET, {
             expiresIn: "1d"
         }
     )

     const transporter = nodemailer.createTransport({
         service: "gmail",
         port: 587,
         secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
         auth: {
             user: "ibrahim17oc23@gmail.com",
             pass: "yekopiqsvxjzhdvc",
         },
     });

     try {
         const info = await transporter.sendMail({
             from: 'ibrahim17oc23', // sender address
             to: email, // list of recipients
             subject: "pleace veryfi your email", // subject line
             html: `
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#4f46e5;color:#fff;text-align:center;padding:25px;">
            <h2 style="margin:0;">Welcome to Our Service</h2>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:20px;color:#333;">
            <h3>Hi Dear User 👋</h3>

            <p>
              Thank you for joining us! We are happy to have you here.
              You will get updates, offers, and important news from us.
            </p>

            <p>
              Explore our platform and enjoy your experience.
            </p>

            <p style="text-align:center;margin-top:20px;">
              <a href="http://localhost:5173/veryfiemail/${token}"
                 style="background:#4f46e5;color:#fff;padding:12px 20px;text-decoration:none;border-radius:5px;display:inline-block;">
                Verify Email
              </a>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;text-align:center;padding:15px;font-size:12px;color:#777;">
            © 2026 Your Company. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
            `, // HTML body
         });

         console.log("Message sent: %s", info.messageId);
         // Preview URL is only available when using an Ethereal test account
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
     } catch (err) {
         console.error("Error while sending mail:", err);
     }


     res.send({ message: "registration successful" })

 })

 const port = process.env.PORT || 8000

 app.listen(port, () => {
     console.log(`server running on ${port}`)
 })