const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "ibrahim17oc23@gmail.com",
        pass: "tiddaqksawrefled",
    },
});


let mailVerification = async(token, email) => {

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

}

let resetPasswordMail = async(token, email) => {

    try {
        const info = await transporter.sendMail({
            from: 'ibrahim17oc23@gmail.com', // sender address
            to: email, // list of recipients  
            subject: "Please Reset Your Password", // subject line
            text: "Hello world?", // plain text body
            html: `<body style=margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif><table border=0 cellpadding=0 cellspacing=0 style="background:#f4f6f8;padding:40px 0"width=100%><tr><td align=center><table border=0 cellpadding=0 cellspacing=0 style=background:#fff;border-radius:12px;overflow:hidden width=600><tr><td align=center style="background:#00b207;padding:30px 20px"><h1 style=color:#fff;margin:0;font-size:32px>EcoBazar</h1><p style=color:#eaffea;margin-top:8px;font-size:16px>Fresh Grocery & Organic Food<tr><td style="padding:40px 35px"><h2 style=margin-top:0;color:#1a1a1a;font-size:28px>Reset Your Password</h2><p style=font-size:16px;line-height:28px;color:#555>Hello <strong>{{username}}</strong>,<p style=font-size:16px;line-height:28px;color:#555>We received a request to reset your EcoBazar account password. Click the button below to create a new password.<table border=0 cellpadding=0 cellspacing=0 style="margin:35px auto"align=center><tr><td align=center style=border-radius:8px bgcolor=#00B207><a href="http://localhost:5173/resetpassword/${token}" style="display:inline-block;padding:16px 35px;font-size:16px;color:#fff;text-decoration:none;font-weight:700">Reset Password</a></table><p style=font-size:15px;line-height:26px;color:#777>If the button above does not work, copy and paste this link into your browser:<p style=word-break:break-all;font-size:14px;color:#00b207>http://localhost:5173/resetpassword/${token}<p style=font-size:15px;line-height:26px;color:#777>This password reset link will expire in <strong>15 minutes</strong>.<p style=font-size:15px;line-height:26px;color:#777>If you did not request a password reset, you can safely ignore this email.<hr style="border:none;border-top:1px solid #eee;margin:35px 0"><p style=font-size:14px;color:#999;text-align:center>Need help? Contact our support team at <a href=mailto:support@ecobazar.com style=color:#00b207;text-decoration:none>support@ecobazar.com</a><tr><td align=center style="background:#f9f9f9;padding:25px 20px"><p style=margin:0;font-size:14px;color:#888>© 2026 EcoBazar. All rights reserved.<p style=margin-top:8px;font-size:13px;color:#aaa>EcoBazar Ecommerce Platform</table></table></body>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }

}

module.exports = { mailVerification, resetPasswordMail }