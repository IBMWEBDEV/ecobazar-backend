require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const dbConfig = require("./config/dbConfig")
const User = require('./models/userModels')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

// Middleware
app.use(express.json())
app.use(cors())

// Database config
dbConfig()


app.post("/registration", async(req, res) => {
    const { email, password, confirmPassword, terms } = req.body

    let existingUser = await User.findOne({ email: email })


    if (existingUser) {
        return res.send({ message: "User already exists" })
    }

    if (!terms) {
        return res.send({ message: "Please Accept Our Terms and Condition" })
    }

    if (!email || !password || !confirmPassword) {
        return res.send({ message: "Please fill all the field" })
    }

    if (password !== confirmPassword) {
        return res.send({ message: "password no matched" })
    }

    let user = new User({
        email: email,
        password: password,
        terms: terms
    })

    user.save()

    let token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    })


    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "ibrahim17oc23@gmail.com",
            pass: "tiddaqksawrefled",
        },
    });


    try {
        const info = await transporter.sendMail({
            from: 'ibrahim17oc23@gmail.com', // sender address
            to: email, // list of recipients  
            subject: "Please Verify Your Email", // subject line
            text: "Hello world?", // plain text body
            html: `<body style=margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif><table border=0 cellpadding=0 cellspacing=0 bgcolor=#f4f4f4 width=100%><tr><td style="padding:40px 15px"align=center><table border=0 cellpadding=0 cellspacing=0 bgcolor=#ffffff width=600 style="border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08)"><tr><td style=padding:30px align=center bgcolor=#00B207><h1 style=color:#fff;margin:0;font-size:32px>EcoBazar</h1><p style=color:#eaffea;margin-top:8px;font-size:16px>Fresh & Organic Ecommerce<tr><td style="padding:40px 35px;color:#333"><h2 style=margin-top:0;font-size:26px;color:#222>Verify Your Email Address</h2><p style=font-size:16px;line-height:1.7>Hello User,<p style=font-size:16px;line-height:1.7>Thank you for creating an account with <strong>EcoBazar</strong>. Please verify your email address to activate your account and start shopping.<table border=0 cellpadding=0 cellspacing=0 style="margin:35px auto"align=center><tr><td style=border-radius:8px align=center bgcolor=#00B207><a href="http://localhost:5173/verifyemail/${token}" style="font-size:16px;color:#fff;text-decoration:none;padding:15px 35px;display:inline-block;font-weight:700"target=_blank>Verify Email</a></table><p style=font-size:15px;line-height:1.7;color:#666>If the button above does not work, copy and paste the following link into your browser:<p style=word-break:break-all;color:#00b207;font-size:14px>http://localhost:5173/verifyemail/${token}<p style=font-size:15px;line-height:1.7;color:#666>This verification link will expire in <strong>24 hours</strong>.<p style=font-size:15px;line-height:1.7;color:#666>If you did not create this account, you can safely ignore this email.<p style=margin-top:35px;font-size:16px>Best Regards,<br><strong>EcoBazar Team</strong><tr><td style=padding:25px;font-size:13px;color:#888 align=center bgcolor=#f8f8f8>© 2026 EcoBazar. All Rights Reserved.<br><br>Dhaka, Bangladesh</table></table>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }



    res.send({ message: "Registration Successfull" })




})

let port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`Server running on port ${port}`)
})